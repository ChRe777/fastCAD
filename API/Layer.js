// Layer.js

// Imports
//
import { useStore } from 'stores/store'
import { useSelectionStore } from 'stores/selection'

// Constants
//
const layersByIdTable = new Map() // TODO: STORE ??
const layersByNameTable = new Map()

// Functions
//
function initCaches() {
    forEach(layer => layersByIdTable.set(layer.id, layer))
    forEach(layer => layersByIdTable.set(layer.name, layer))
}

function forEach_(fn, layers) {
    if (layers === undefined) {
        return
    }
    layers.forEach(layer => {
        fn(layer)
        forEach_(fn, layer.layers)
    })

}

function forEach(fn) {
    const store = useStore()
    forEach_(fn, store.scene.layers)
}

function create(name, description) {

    const layer = create("layer", {
        'name': name,
        'description': description,
        ...defaults.layer
    })

    layersByIdTable.set(layer.id, layer)
    layersByNameTable.set(layer.name, layer)

    setCurrentLayer(layer)
}

// Create Layer helper
//
function create_(type, attrs) {

    const store = useStore()

    let newLayer = {
        "type": type,
        "id": type + "-" + randomUUID(),
        ...attrs,
        "elements": [],
        "layer-open": false,
        "layers": []
    }

    store.scene.layers.push(newLayer)

    return newLayer
}

// TODO: REFACTOR
function removeElement_(layer, element) {
    layer.elements = layer.elements.filter(obj => obj.id !== element.id)
    if (layer.layers != undefined) { // layer should be []
        for (let subLayer of layer.layers) {
            removeElement_(subLayer, element)
        }
    }
}

function trash(layer) {
    // TODO: REMOVE FROM SCENE
    // TODO: Check is layer is empty in GUI -> Dialog

    layersByIdTable.delete(layer.id)
    layersByNameTable.delete(layer.name)
}

// set current layer
//
function setCurrent(layer) {
    const selectionStore = useSelectionStore()
    selectionStore.selectedLayersSet.clear()
    selectionStore.selectedLayersSet.add(layer)
}

function getCurrent() {
    const selectionStore = useSelectionStore()
    return Array.from(selectionStore.selectedLayersSet)[0]
}

// is current layer
//
function isCurrent(layer) {
    const selectionStore = useSelectionStore()
    return selectionStore.selectedLayersSet.has(layer)
}

function toogleOpen(layer) {
    layer['layers-open'] = !layer['layers-open']
}

function hasChilds(layer) {

    return false

    if (layer.layers !== undefined) {
        return layer.layers.length > 0
    }
    return false
}

function numChilds(layer) {

    return 0

    // TODO: CACHING

    let childs = layer.elements.length

    if (layer.layers === undefined) {
        return childs
    }

    return childs + layer.layers
        .map(numLayerChilds)
        .reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0);
}

function isOpen(layer) {
    return layer['layers-open']
}

function getById(id) {
    return layersByIdTable.get(id)
}

function getByName(name) {
    return layersByNameTable.get(id)
}

function selectFirst() {
    const store = useStore()
    const selectionStore = useSelectionStore()

    if (store.scene.layers && store.scene.layers.length > 0) {
        selectionStore.selectedLayersSet.clear()
        selectionStore.selectedLayersSet.add(store.scene.layers[0])
    }
}

function removeFrom(layer, element) {
    removeElement_(layer, element)
}

function addTo(layer, element) {
    layer.elements.push(element)
}

export default {
    create,
    trash, // TODO: 
    //
    addTo,
    removeFrom,
    //
    setCurrent,
    getCurrent,
    isCurrent,
    //
    getById,
    getByName,
    //
    hasChilds,
    numChilds,
    //
    isOpen,
    toogleOpen,
    //
    selectFirst,
    //
    initCaches
}
