// Editor.js

// THIS is part of the GUI 
// TODO: Rethink if this should be in an api
// api should also work in TUI-Mode/Console-Mode

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