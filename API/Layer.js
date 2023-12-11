// Layer.js

// Imports
//
import { useStore } from 'stores/store'
import { useSelectionStore } from 'stores/selection'
import { defaults } from 'services/defaults'

// Constants
//

const { randomUUID } = new ShortUniqueId({ length: 10 });

// Functions
//

function forEach_(fn, elements) {
    if (elements === undefined) {
        return
    }

    let layers = elements.filter(element => element.type === 'layer')

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

    const layer = create_("layer", {
        'svg-type': 'g',
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
        "isopen": false,
        "visibility": "visible"
    }

    return newLayer
}

function removeElement_(layer, element) {
    layer.elements = layer.elements.filter(element_ => element_.id !== element.id)

    const subLayers = layersOfElements(layer.elements)

    for (let subLayer of subLayers) {
        removeElement_(subLayer, element)
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
    if (layer.visibility === 'visible') {
        layer.visibility = 'hidden'
    } else {
        layer.visibility = 'visible'
    }
}

function isVisible(layer) {
    return layer.visibility === 'visible'
}

function toogleFreezing(layer) {
    layer['isfrozen'] = !layer['isfrozen']
    return layer['isfrozen']
}

function isFrozen(layer) {
    return layer['isfrozen']
}
function isNotFrozen(layer) {
    return !isFrozen(layer)
}


function hasChilds(layer) {
    const firstLayer = layer.elements.find(element => element.type === "layer")
    return firstLayer !== undefined
}

function numberOfSubElements_(elements) {
    let subLayers = layersOfElements(elements)
    return subLayers
        .map(numberOfElements)
        .reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0);
}

function numberOfElements(layer) {
    let childsNum = elementsOfElements(layer.elements).length
    return childsNum + numberOfSubElements_(layer.elements)
}

function isOpen(layer) {
    return layer['isopen']
}

function layersOfElements(elements) {
    return elements.filter(element => element.type === 'layer')
}

function elementsOfElements(elements) {
    return elements.filter(element => element.type !== 'layer')
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
    hasChilds,
    numberOfElements,
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
