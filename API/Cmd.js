// Cmd.js

// Imports
//
import { useCmdStore } from 'stores/cmd'

// Functions
//
// TODO: REFACTORING
function invokeCmdByName(cmdName, args) {
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
                console.log(cmdName, "error", error.message)
                return false
            }
        }
    }
}

export default {
    invokeCmdByName
}