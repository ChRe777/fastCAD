// interpret.js
//

// Imports
//
import api from 'services/api'

// Functions
//
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

    return api.invokeCmdByName(cmdName, args)
}

// Exports
//
export {
    interpret
}