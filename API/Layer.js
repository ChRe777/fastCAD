// Layer.js

// Imports
//
import { useStore } from 'stores/store'
import { useSelectionStore } from 'stores/selection'
import { defaults } from 'services/defaults'

import modify from 'api/modify'
import scene from 'api/scene'

// Constants
//
// const layersByIdTable = new Map() // TODO: STORE ??
// const layersByNameTable = new Map()

const { randomUUID } = new ShortUniqueId({ length: 10 });


// Functions
//

function forEach_(fn, elements) {
    if (elements === undefined) {
        return
    }

    let layers = elements.filter(element => element.subtype === 'layer')

    layers.forEach(layer => {
        fn(layer)
        forEach_(fn, layer.elements)
    })
}

function forEach(fn) {
    const store = useStore()
    forEach_(fn, store.scene.elements)
}

function create(name, description) {

    const layer = create_("g", {
        'subtype': 'layer',
        'name': name,
        'description': description,
        ...defaults.layer
    })

    setCurrent(layer)

    return layer
}

// Create Layer helper
//
function create_(type, attrs) {

    let newLayer = {
        "type": type,
        "id": type + "-" + randomUUID(),
        ...attrs,
        "elements": [],
        "isopen": false
    }

    // TODO: Remove dependency
    scene.addLayer(newLayer)

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
    console.log("trash not implemented!!")
    // TODO: REMOVE FROM SCENE
    // TODO: Check is layer is empty in GUI -> Dialog
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
    layer['isopen'] = !layer['isopen']
    return layer['isopen']
}

function toogleVisibility(layer) {

    console.log("layer.style", layer.style)
    if (layer.style.indexOf('visible') >= 0) {
        // TODO: Remove Dependency
        modify.modify(layer, 'layer', { style: 'visibility:hidden' })
        console.log("layer.style", layer.style)
    } else {
        modify.modify(layer, 'layer', { style: 'visibility:visible' })
    }
}

function hasChilds(layer) {
    console.log("hasChild", layer.name)
    if (layer && layer.elements !== undefined) {
        console.log("hasChild 11", layer.name, layer.elements)
        for (const element of layer.elements) {
            console.log("hasChild 11 - subtype", element.id, element.subtype)
            if (element.subtype === "layer") {
                return true
            }
        }
    }

    return false
}

function numberOfSubElements_(elements) {
    let elementsWithoutLayers = elements.filter(element => element.subtype !== 'layer')
    return elementsWithoutLayers
        .map(numberOfElements)
        .reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0);
}

function numberOfElements(layer) {

    if (layer == undefined || layer.elements === undefined) {
        return 0
    }

    let childs = layer.elements.filter(element => element.subtype !== 'layer')
    let childsNum = childs.length // without layer

    if (hasChilds(layer)) {
        return childsNum + numberOfSubElements_(layer.elements)
    }

    return childsNum
}

function isOpen(layer) {
    return layer['isopen']
}

function getById_(id, elements) {

    for (const element of elements) {
        if (element.subtype === "layer") {
            let layer = element
            if (layer.id === id) {
                return layer
            }
            if (hasChilds(layer)) {
                let found = getById_(id, layer.elements)
                if (found !== undefined) {
                    return found
                }
            }
        }
    }

    return undefined
}

function getById(id) {
    const store = useStore()
    return getById_(id, store.scene.elements)
}

function layersOfElements(elements) {
    if (elements === undefined) {
        return []
    }
    return elements.filter(element => element.subtype === 'layer')
}

function selectFirst() {
    const store = useStore()
    const selectionStore = useSelectionStore()

    let layers = layersOfElements(store.scene.elements)

    if (layers && layers.length > 0) {
        selectionStore.selectedLayersSet.clear()
        selectionStore.selectedLayersSet.add(layers[0])
    }
}

function removeElement(layer, element) {
    removeElement_(layer, element)
}

function addLayer(layer, element) {
    layer.elements.push(element)
}

export default {
    create,
    trash,
    //
    addLayer,
    removeElement,
    //
    setCurrent,
    getCurrent,
    isCurrent,
    //
    getById,
    //
    hasChilds,
    numberOfElements,
    //
    isOpen,
    toogleOpen,
    toogleVisibility,
    //
    selectFirst,
    //
    forEach,
    //initCaches
}
