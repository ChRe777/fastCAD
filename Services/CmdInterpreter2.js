// interpret.js
//

// Imports
//
import { useCmdStore } from 'stores/cmd';

// Functions
//

function invokeCmd(cmdName, args) {
    let cmdStore = useCmdStore()
    if (cmdName in cmdStore.registeredCmdsByName) {
        let cmd = cmdStore.registeredCmdsByName[cmdName]
        cmd.action(args)
        return true
    }
    return false
}

function interpret(str) {

    console.log(`interpret -> ${str}`)
    
    // Remove whitespaces
    //
    str = str.trim();

    // Empty line or Comment
    //
    if (str === "" || str.startsWith('#')) {
        return
    }

    // Arguments
    //
    const args = str.split(' ')
    const cmdName = args[0]

    return invokeCmd(cmdName, args)
}

// Exports
//
export {
    interpret
}