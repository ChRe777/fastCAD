// Cmd.js

// Imports
//
import { useCmdStore } from 'stores/cmd'

// Functions
//

function register(cmd) {
    const cmdStore = useCmdStore()
    cmdStore.registeredCmdsByName[cmd.name] = cmd
    cmdStore.registeredCmds.push(cmd)
}

// TODO: REFACTORING
function invokeByName(cmdName, args) {
    const cmdStore = useCmdStore()
    if (!cmdName in cmdStore.registeredCmdsByName) {
        console.log(cmdName, "is not registered!")
        return false
    }

    const cmd = cmdStore.registeredCmdsByName[cmdName]
    if (cmd === undefined) {
        return { 'error': true, 'message': `command '${cmdName}' not found` }
    }

    try {
        cmd.action(args)
        return { 'error': false, 'message': "" }
    } catch (error) {
        console.error("error in invoke command", cmdName, " - ", error.message, error.stack)
        return { 'error': true, 'message': error.message }
    }
}

// Exports
//
export default {
    register,
    invokeByName
}