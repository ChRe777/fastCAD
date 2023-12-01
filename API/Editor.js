// Editor.js

// Imports
//
import { useEditorStore } from 'stores/editor'

// Functions
//
function clear() {
    const editorStore = useEditorStore()

    editorStore.editingAttributes = {}
    editorStore.layerEditingAttributes = {}
}

// Exports 
//
export default {
    clear
}