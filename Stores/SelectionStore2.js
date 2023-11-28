// selection.js
//

// Imports
//
import { defineStore } from 'pinia'

// Store editor stuff
//
export const useSelectionStore = defineStore('selectionStore', {
    //
    // State
    //
    state: () => ({
        selectedElementsSet: new Set([]),
        selectedLayersSet: new Set([]),
    }),
})