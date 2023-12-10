// Selection.js

// Imports
//
import { useSelectionStore } from 'stores/selection'
import layers from 'api/layer'

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

function select(element, layer) {

    const store = useSelectionStore()

    // TODO: Groups
    //
    // <g>
    //      <line></line>
    //      <line></line>
    // </g>

    // TODO: Refactor getParent(element) or getLayer(element)
    //
    if (layers.isNotFrozen(layer)) {
        store.selectedElementsSet.add(element)
    }
    return element
}

// deselect
//
function deselect(element) {
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