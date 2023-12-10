// ToolStore.js
//

// Imports
//
import { defineStore } from 'pinia'

// Store 'tools'
//
export const useToolStore = defineStore('toolStore', {
    //
    // State
    //
    state: () => ({
        registeredTools: [],
        registeredToolsByName: {}
    }),
    actions: {
        registerTool(tool) {
            this.registeredToolsByName[tool.name] = tool
            this.registeredTools.push(tool)
            console.log(`Tool '${tool.name}' successful registered`)
        }
    }
})