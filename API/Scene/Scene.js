// Scene.js

// The scene is a tree of element nodes with parents and childs
// The scene api is there to manipulate the tree, but not create elements.
// The scene is the rootNode of all elements.

// TODO: Does I need a ShadowScene?? For faster .. , like a BackBuffer in OpenGL

//
// https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow

// scene (= root, document, svg, rootNode)
//   o layer0 
//      o layer0.1
//          - child0.1
//      - child1
//      - child2
//      * group1
//          - childA
//          - childB
//   o layer1
//      - child3

// element.removeChild
// element.appendChild
// element.replaceChild
// element.insertBefore
// element.parentNode
// element.nextSibling
// element.previousSibling
// element.nodeType
// element.childNodes
// element.hasChildNodes
// element.childElementCount
// element.getElementsByType (e.g. 'layer')

// scene.createElement('layer', { }) (like document.createElement("layer", {... }))

// not attached to a parent ...

// perhaps find parent in extra structure (hash-table)
// ParentStructure/Cache
// {   
//        "circle-234234": parentNode1,
//        "rect-234234": parentNode2 
// }


// Imports
//

import { useStore } from 'stores/store'

import selection from 'api/selection'
import layer from 'api/layer'
import element from 'api/element'

// TODO: Move out because it is GUI
import editor from 'api/editor'
import selections from 'api/selection'


// Constants
//

// Caches
//

// {   
//    "circle-234234": parentNode1,
//    "rect-234234": parentNode2 
// }
//
let parentsByElementId = {}

// {   
//    "circle-234234": element1,
//    "rect-234234": element2 
// }
//
let elementsByElementId = {}

// {   
//    "layer0": layer1,
//    "layer1": layer2 
// }
//
let layersByName = {}

// Clear/Reset all caches
//
function clearCaches_() {
    parentsByElementId = {}
    elementsByElementId = {}
    layersByName = {}
}

// Functions
//


// Set the scene
//
function set(scene) {   // TODO: IO private
    const store = useStore()
    store.scene = scene

    // Fill caches
    //
    forEach(storeParent_)
}

// Get the scene // TODO: IO private
//
function get() {
    const store = useStore()
    return store.scene
}

// Clears the scene
//
function clear() {
    const store = useStore()
    // TODO: Really make full clear
    store.scene.elements = []
    clearCaches_()
}

// Create a new scene
//
function create() {
    clear()
    selections.clear() // TODO: UI onNewScene- or onSceneChanged-Event
    editor.clear()  // TODO: UI
}

// TODO:
// TODO: [v] CACHING AND  [ ] REFACTORING
// TODO:
function getElementByX_(element, findFn) {

    console.log("getElementByX - element", element)

    if (findFn(element) == true) {
        return element
    }

    if (element.elements) {
        for (let child of element.elements) {
            let found = getElementByX_(child, findFn)
            if (found !== undefined) {
                return found
            }
        }
    }

    return undefined
}

// Get the element by id
//
function getElementById(id) {

    let foundCached = elementsByElementId[id]
    if (foundCached) {
        return foundCached
    }

    const store = useStore()
    let findFn = (obj) => obj.id === id

    for (let element of store.scene.elements) {
        let found = getElementByX_(element, findFn)
        if (found != undefined) {
            // Add to cache
            //
            elementsByElementId[id] = found
            //
            return found
        }
    }

    return undefined
}

function getElementsByType(type) {

}

// Append layer to scene or parent layer
//
function appendLayer(layer, parent) {
    const store = useStore()
    if (parent == undefined) {
        store.scene.elements.push(layer)
    } else {
        parent.elements.push(layer)
    }
}

function appendElement(parent, element) {
    if (parent == undefined) {
        console.error("appendElement parent not defined")
    }
    parent.elements.push(element)
}

// Elements of scene
// 
function elements() {
    const store = useStore()
    return store.scene.elements
}

// Stores the parent of an element
// Used in set scene
//
function storeParent_(parent, element) {
    parentsByElementId[element.id] = parent
    //console.log("storeParent", parentsByElementId)
}

// Get the stored parent of an element
//
function getParent(element) {
    console.log("getParent - element:", element)
    console.log("getParent - parentsByElementId", parentsByElementId)
    return parentsByElementId[element.id]
}

// Get layer by name
// TODO: [v] CACHING AND [ ] REFACTORING
//
function getLayerByName(name) {

    let foundCached = layersByName[name]
    if (foundCached) {
        return foundCached
    }

    const store = useStore()

    let findFn = (obj) => obj.type === 'layer' && obj.name === name

    for (let element of store.scene.elements) {
        let found = getElementByX_(element, findFn)
        if (found !== undefined) {
            layersByName[name] = found
            return found
        }
    }

    return undefined
}

function getLayerById(id) {

}



// For each element tree walker
//
function forEach_(fn, parent, element) {

    fn(parent, element)

    // Go down next level
    let parent_ = element
    if (parent_.elements) {
        for (let element_ of parent_.elements) {
            forEach_(fn, parent_, element_)
        }
    }
}

// For each element tree walker
//
function forEach(fn) {
    const store = useStore()
    if (store.scene.elements) {
        let parent = store.scene
        for (let element of store.scene.elements) {
            forEach_(fn, parent, element)
        }
    }
}

// Create an element
// e.g. createElement('line', {p1, isRelative1, p2, isRelative2})
//
function createElement(type, attrs) {

    const newElement = element.create(type, attrs)

    if (newElement === undefined) {
        console.error(`New element could not be created - type: ${type}, attribute: ${attrs}`)
        return undefined
    }

    // Place into current active Layer
    //
    let currentLayer = selection.getCurrentLayer()
    console.log("currentLayer", currentLayer)
    appendElement(currentLayer, newElement)

    // Set parent
    //
    storeParent_(currentLayer, newElement)

    // Store last created element
    //
    const store = useStore()
    store.lastCreatedElement = newElement

    return newElement

}

// Same as createElement('layer', props)
//
function createLayer(attrs) {
    let newLayer = layer.create(attrs)
    appendLayer(newLayer)


    // Store last created element
    //
    // const store = useStore()
    // store.lastCreatedElement = newElement

    return newLayer
}

// Exports
//
export default {
    //
    set,    // TODO: for IO-Store - make private function - call without export
    get,    // TODO: for IO-Store - make private function - call without export
    //
    create, // TODO: What is the difference between create or clear
    clear, // TODO: newScene ??
    //
    createLayer,    // Layer is a special element
    createElement,
    //
    appendLayer,
    appendElement,
    //
    getParent,
    //
    getLayerByName,
    getLayerById,
    //
    getElementById,
    getElementsByType,
    //
    elements, // like scene.childNodes
    forEach, // TODO: rename Tree Walker
    //
}



