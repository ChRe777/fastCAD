// api.js
//

// Is like a CRUD(S) .. Create, Update and Delete (+ Select)

// create -> id / id -> destroy
// id -> modify -> id
// id -> select -> id/ id -> deselect -> id


// Imports
//
import { useStore } from 'stores/store'
import { useSelectionStore } from 'stores/selection'

// Create unique id
// see https://shortunique.id
//
const { randomUUID } = new ShortUniqueId({ length: 10 });

// create('line', {x1:0,y1:0,x2:0,y2:0}) -> 'line-1'
//
function create(type, attrs) {

    if (type === 'layer') {
        return createLayer_(type, attrs)
    }

    // Create new object
    //
    let obj = {
        "type": type,
        "id": type + "-" + randomUUID(),
        ...attrs
    }

    // Place into current active Layer
    //
    let currentLayer = getCurrentLayer()
    currentLayer.elements.push(obj)

    // Store last created element
    //
    const store = useStore()
    store.lastCreatedElement = obj

    return obj
}

// Create Layer helper
//
function createLayer_(type, attrs) {

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

function removeFromLayer_(layer, element) {
    layer.elements = layer.elements.filter(obj => obj.id !== element.id)
    if (layer.layers != undefined) { // layer should be []
        for (let subLayer of layer.layers) {
            removeFromLayer_(subLayer, element)
        }
    }
}

// destroy('line-1')
//
function destroy(element, type, attrs) {

    const store = useStore()

    // Remove from all layers
    //
    store.scene.layers.map((layer) => removeFromLayer_(layer, element))

    // if destroyed was last element
    //
    if (store.lastCreatedElement != undefined) {
        if (store.lastCreatedElement.id === element.id) {
            store.lastCreatedElement = undefined
        }
    }
}


// modify
//
function modify(element, type, attrs) {
    if (element === undefined) {
        return
    }

    if (element.type === type) {
        Object.assign(element, attrs)
    }
    return element
}


function mirror(element, type, axis, value) {

    let attrsMirrored = {}

    // line 
    //
    if (type === 'line') {
        if (axis === 'y') {
            attrsMirrored['x1'] = ((parseFloat(element['x1']) - value) * -1.0) + value
            attrsMirrored['x2'] = ((parseFloat(element['x2']) - value) * -1.0) + value
        }
        if (axis === 'x') {
            attrsMirrored['y1'] = ((parseFloat(element['y1']) - value) * -1.0) + value
            attrsMirrored['y2'] = ((parseFloat(element['y2']) - value) * -1.0) + value
        }
    }

    api.modify(element, type, attrsMirrored)
}

// select
//
function select(element, type, attrs) {

    const store = useSelectionStore()

    if (type == 'layer') {
        setCurrentLayer(element)
        return element
    }

    let isAlreadySelect = store.selectedElements.find((obj) => obj.id === element.id) !== undefined
    if (isAlreadySelect === false) {
        store.selectedElements.push(element)
    }

    return element
}

// deselect
//
function deselect(element, type, attrs) {
    const store = useSelectionStore()
    store.selectedElements = store.selectedElements.filter(obj => obj.id !== element.id);
    return element
}

// set current layer
//
function setCurrentLayer(layer) {
    const store = useSelectionStore()
    store.selectedLayers[0] = layer
}

function getCurrentLayer() {
    const store = useSelectionStore()
    return store.selectedLayers[0]
}

// is current layer
//
function isCurrentLayer(layer) {
    const store = useSelectionStore()
    return store.selectedLayers[0] === layer
}

// get Element by Id
//
function getElementById_(layer, id) {

    let element = layer.elements.find((obj) => obj.id === id)
    if (element != undefined) {
        return element
    }

    for (let subLayer in layer.layers) {
        let element_ = getElementById_(subLayer, id)
        if (element_ != undefined) {
            return element_
        }
    }
}

function getElementById(id) {

    const store = useStore()

    for (let layer in store.scene.layers) {
        let element = getElementById_(layer, id)
        if (element != undefined) {
            return element
        }
    }

    return undefined
}

function getLayerById_(id, layers) {
    if (layers === undefined) {
        return undefined
    }

    for (const layer of layers) {
        if (layer.id === id) {
            return layer
        }
        
        let found = getLayerById_(id, layer.layers)
        if (found !== undefined) {
            return found
        }
        
    }

    return undefined
}

function getLayerById(id) {
    const store = useStore()
    return getLayerById_(id, store.scene.layers)
}

// Export API
//
const api = {
    create,
    destroy,
    //
    modify,
    //
    mirror,
    //
    select,
    deselect,
    //
    getElementById,
    //
    setCurrentLayer,
    getCurrentLayer,
    isCurrentLayer,
    getLayerById
}

export default api;