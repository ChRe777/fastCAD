// Layer.js

// Layer or Group are the same svg-group node
// so they can have childNodes

// Imports
//
import { useStore } from 'stores/store'
import { useSelectionStore } from 'stores/selection'
import { defaults } from 'services/defaults'

import scene from 'api/scene'

// Constants
//
const { randomUUID } = new ShortUniqueId({ length: 10 });

// Functions
//

// helper for each elements call a function fn
//
function forEach_(fn, elements, level) {
    if (elements === undefined) {
        return
    }

    let layers = elements.filter(element => element.type === 'layer')

    layers.forEach(layer => {
        if (fn(layer, level)) {
            forEach_(fn, layer.elements, level + 1)
        }
    })
}

// for each element in layer call a function fn
//
function forEach(fn) {
    const store = useStore()
    let level = 0
    forEach_(fn, store.scene.elements, level)
}

// creates a new layer
//
function create(attrs) {

    const layer = create_("layer", {
        'svg-type': 'g',
        'name': attrs['name'],
        'description': attrs['description'],
        ...defaults.layer
    })

    return layer
}

// Create Layer helper
//
function create_(type, attrs) {

    const newLayer = {
        "type": type,
        "id": type + "-" + randomUUID(),
        ...attrs,
        "elements": [],
        "isopen": false,
        "visibility": "visible"
    }

    return newLayer
}

// helper remove elements from layer
//
function removeElement_(layer, element) {
    layer.elements = layer.elements.filter(element_ => element_.id !== element.id)

    const subLayers = layersOfElements(layer.elements)

    for (let subLayer of subLayers) {
        removeElement_(subLayer, element)
    }
}



// toggle open close
//
function toogleOpen(layer) {
    layer['isopen'] = !layer['isopen']
    return layer['isopen']
}

// toogle visible hidden
//
function toogleVisibility(layer) {
    if (layer.visibility === 'visible') {
        layer.visibility = 'hidden'
    } else {
        layer.visibility = 'visible'
    }
    return layer.visibility
}

// is layer visible
//
function isVisible(layer) {
    return layer.visibility === 'visible'
}

// toogle frozen thaw
//
function toogleFreezing(layer) {
    layer['isfrozen'] = !layer['isfrozen']
    return layer['isfrozen']
}

// is layer frozen
//
function isFrozen(layer) {
    return layer['isfrozen']
}

// is layer not frozen
//
function isNotFrozen(layer) {
    return !isFrozen(layer)
}

// has layer childs
//
function hasChilds(layer) {
    const firstLayer = layer.elements.find(element => element.type === "layer")
    return firstLayer !== undefined
}

// Helper to count sub elements
//
function numberOfSubElements_(elements) {
    let subLayers = layersOfElements(elements)
    return subLayers
        .map(numberOfElements)
        .reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0);
}

// Number of elements of layer and sublayers
//
function numberOfElements(layer) {
    let childsNum = elementsOfElements(layer.elements).length
    return childsNum + numberOfSubElements_(layer.elements)
}

// is layer open ?
//
function isOpen(layer) {
    return layer['isopen']
}

// get only layers of all elements
//
function layersOfElements(elements) {
    return elements.filter(element => element.type === 'layer')
}

// get only elements of all elements without layers
//
function elementsOfElements(elements) {
    return elements.filter(element => element.type !== 'layer')
}

// select first layer
//
function selectFirst() {
    const store = useStore()
    const selectionStore = useSelectionStore()

    let layers = layersOfElements(store.scene.elements)

    if (layers && layers.length > 0) {
        selectionStore.selectedLayersSet.clear()
        selectionStore.selectedLayersSet.add(layers[0])
    }
}

// remove element from layer
//
function removeElement(layer, element) {
    removeElement_(layer, element)
}

// add element to layer
//
function addElement(layer, element) {
    console.log("add Element - layer:", layer)
    layer.elements.push(element)
}

// move element to new layer
//
function moveElement(element, newLayer) {
    let parentLayer = scene.getParent(element)
    removeElement(parentLayer, element)
    addElement(newLayer, element)
}

export default {
    create,     // TODO: CRUD:
    //
    addElement, // TODO: Scene appendElement
    removeElement, // TODO: Scene removeElement
    moveElement, // TODO: Scene moveElement
    //
    hasChilds,
    numberOfElements, // Because Layer can have subLayer, but we want only the elements
    //
    isOpen,
    toogleOpen,
    //
    toogleVisibility,
    isVisible,
    //
    toogleFreezing,
    isFrozen,
    isNotFrozen,
    //
    selectFirst,
    //
    forEach // TODO: Scene.forEachLayer
}
