// selection.js
//

// Imports
//
import { defineStore } from 'pinia'

// Store editor stuff
//
export const useSelectionStore = defineStore('SelectionStore', {
    //
    // State
    //
    state: () => ({
        selectedElements: [],
        selectedLayers: [],
    }),
})