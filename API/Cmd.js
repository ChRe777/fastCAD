// Cmd.js

// Imports
//
import { useCmdStore } from 'stores/cmd'

// Functions
//
// TODO: REFACTORING
function invokeByName(cmdName, args) {
    const cmdStore = useCmdStore()
    if (cmdName in cmdStore.registeredCmdsByName) {

        // TODO: REFACTORING HASHMAP
        const cmd = cmdStore.registeredCmdsByName[cmdName]
        if (cmd === undefined) {
            console.log(cmdName, "not found in command store")
            return false
        } else {
            try {
                cmd.action(args)
            } catch (error) {
                console.log("error in invoke command", cmdName, " - ", error.message, error.stack)
                return false
            }
        }
    }
}

export default {
    invokeByName
}