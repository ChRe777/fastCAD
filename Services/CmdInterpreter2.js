// interpret.js
//

// Imports
//
import { useCmdStore } from 'stores/cmd';

// Functions
//
function interpret(str) {

    // Remove whitespaces
    //
    str = str.trim();

    // Empty line
    //
    if (str === "") {
        return
    }

    // Comments
    //
    if (str.startsWith('#')) {
        return
    }

    // Arguments
    //
    const args = str.split(' ')
    const cmdName = args[0]

    console.log(`interpret ${args}`)

    let cmdStore = useCmdStore()
    if (cmdName in cmdStore.registeredCmdsByName) {
        let cmd = cmdStore.registeredCmdsByName[cmdName]
        cmd.action(args)
        return true
    }

    console.log(`command ${cmdName} not found`)

    return false

}

// Exports
//
export {
    interpret
}