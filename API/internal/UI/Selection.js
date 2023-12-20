// Selection.js

// Imports
//
import { useSelectionStore } from 'stores/selection'
import api from 'api/internal'

// Exports
//

export default {
    forEach,
    clear,
    clearWithLayers,
    isSelected,
    select,
    selectMany,
    deselect,
    //
    elements,
    //
    setCurrentLayer,
    getCurrentLayer,
    isCurrentLayer
}

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
function select(element) {

    const store = useSelectionStore()

    // TODO: Groups
    //
    // <g>
    //      <line></line>
    //      <line></line>
    // </g>
    let layer = api.scene.getParent(element)
    console.log("I am here 2", layer)
    if (layer && api.layer.isNotFrozen(layer)) {
        store.selectedElementsSet.add(element)
    }
    return element
}

// Select a list of elements
//
function selectMany(elements) {
    elements.forEach(e => select(e))
}

// deselect
//
function deselect(element) {
    const store = useSelectionStore()
    store.selectedElementsSet.delete(element);
    return element
}

// elements
//
function elements() {
    const store = useSelectionStore()
    return store.selectedElementsSet
}

// set current layer
//
function setCurrentLayer(layer) {
    const selectionStore = useSelectionStore()
    selectionStore.selectedLayersSet.clear()
    selectionStore.selectedLayersSet.add(layer)
}

function getCurrentLayer() {
    const selectionStore = useSelectionStore()
    return Array.from(selectionStore.selectedLayersSet)[0]
}

// is current layer
//
function isCurrentLayer(layer) {
    const selectionStore = useSelectionStore()
    return selectionStore.selectedLayersSet.has(layer)
}

