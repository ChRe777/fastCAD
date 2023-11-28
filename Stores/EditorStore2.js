// editor.js
//

// Imports
//
import { defineStore } from 'pinia'

// Store editor stuff
//
export const useEditorStore = defineStore('editorStore', {
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