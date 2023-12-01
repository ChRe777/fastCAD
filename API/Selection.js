// Selection.js

// Imports
//
import { useSelectionStore } from 'stores/selection'

// Functions
//
function forEach(fn) {
    const selectionStore = useSelectionStore()
    selectionStore.selectedElementsSet.forEach(selectedElement => fn(selectedElement))
}

// TODO: The same als CLEAR ???
function clear() {
    const selectionStore = useSelectionStore()
    selectionStore.selectedElementsSet.clear()
}

// TODO: ???
function clearWithLayers() {
    const selectionStore = useSelectionStore()
    selectionStore.selectedElementsSet.clear()
    selectionStore.selectedLayersSet.clear()
}



function isSelected(element) {
    const store = useSelectionStore()
    return store.selectedElementsSet.has(element)
}

// select
//
function select(element, type, attrs) {

    const store = useSelectionStore()

    if (type == 'layer') {
        setCurrentLayer(element)
        return element
    }
    store.selectedElementsSet.add(element)
    return element
}

// deselect
//
function deselect(element, type, attrs) {
    const store = useSelectionStore()
    store.selectedElementsSet.delete(element);
    return element
}

// Exports
//

export default {
    forEach,
    clear,
    clearWithLayers,
    isSelected,
    select,
    deselect
}