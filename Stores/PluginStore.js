// PluginStore.js
//

// Imports
//
import { defineStore } from 'pinia'

// Store editor stuff
//
export const usePluginStore = defineStore('pluginStore', {
    //
    // State
    //
    state: () => ({
        registeredPlugins: {},
    })
})