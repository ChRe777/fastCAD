// Layer.js

// Layer is a special element
// Layer is build with 'g' svg element
// Layer or group can have childs

// Imports
//
import { useStore } from 'stores/store'
import { useSelectionStore } from 'stores/selection'

import scene from 'api/scene'

// Exports
//
export default {
    //
    appendElement,
    removeElement,
    moveElement,
    //
    hasChilds,
    getChildsCount,
    //
    hasElements,
    getElementsCount,
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
    forEach
}

// Functions
//

// helper for each elements call a function fn
//
function forEach_(fn, elements, parent, level) {
    if (elements === undefined) {
        return
    }

    let layers = elements.filter(element => element.type === 'layer')

    layers.forEach(layer => {
        if (fn(layer, parent, level)) { // TODO: Parent
            forEach_(fn, layer.elements, parent, level + 1)
        }
    })
}

// for each layer in scene call fn
//
function forEach(fn) {
    const store = useStore()
    let level = 0
    forEach_(fn, store.scene.elements, store.scene, level)
}

// helper remove elements from layer
//
function removeElement_(layer, element) {
    layer.elements = layer.elements.filter(element_ => element_.id !== element.id)

    const subLayers = layersOnly_(layer.elements)

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

function getChildsCount(layer) {
    if (hasChilds(layer)) {
        return layersOnly_(layer.elements).length
    }
    return 0
}

// Helper to count sub elements
//
function getElementsCount(layer, withSubLayer = false) {

    let count = getElementsCount_(layer)

    let subCount = 0
    if (withSubLayer) {
        let subLayers = layersOnly_(layer.elements)
        subCount = subLayers
            .map(getElementsCount)
            .reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            }, 0);
    }

    return count + subCount
}

// Number of elements of layer and sublayers
//
function getElementsCount_(layer) {
    let childsNum = elementsOnly_(layer.elements).length
    return childsNum //+ getChildsCount(layer)
}

function hasElements(layer) {
    const firstElement = layer.elements.find(element => element.type !== "layer")
    return firstElement !== undefined
}

// is layer open ?
//
function isOpen(layer) {
    return layer['isopen']
}

// get only layers of all elements
//
function layersOnly_(elements) {
    return elements.filter(element => element.type === 'layer')
}

// get only elements of all elements without layers
//
function elementsOnly_(elements) {
    return elements.filter(element => element.type !== 'layer')
}

// select first layer
//
function selectFirst() {
    const store = useStore()
    const selectionStore = useSelectionStore()

    let layers = layersOnly_(store.scene.elements)

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

// append element to layer
//
function appendElement(layer, element) {
    //console.log("add Element - layer:", layer)
    layer.elements.push(element)
}

// move element to new layer
//
function moveElement(element, newLayer) {

    let parentLayer = scene.getParent(element)

    removeElement(parentLayer, element)
    appendElement(newLayer, element)
}

