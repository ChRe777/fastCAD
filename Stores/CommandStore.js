// CommandStore.js
//

// Imports
//
import { defineStore } from 'pinia'

// Store 'commands'
//
export const useCmdStore = defineStore('commandStore', {
    //
    // State
    //
    state: () => ({
        registeredCmds: [],
        registeredCmdsByName: {}
    }),
    actions: {
        registerCmd(cmd) {
            this.registeredCmdsByName[cmd.name] = cmd
            this.registeredCmds.push(cmd)
        }
    }
})