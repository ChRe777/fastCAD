// editor.js
//

// Imports
//
import { defineStore } from 'pinia'

// Store editor stuff
//
export const useEditorStore = defineStore('EditorStore', {
    //
    // State
    //
    state: () => ({
        editingAttributes: {},
        layerEditingAttributes: {},
    }),
    actions: {
    }
})