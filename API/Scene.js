// Scene.js

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
// getParent(id)
//    {   
//        "circle-234234": parentNode1,
//        "rect-234234": parentNode2 
//    }


// Imports
//
import { useMessageStore } from 'stores/message'
import { useStore } from 'stores/store'

import io from 'services/io'

import api from 'api/api'
import editor from 'api/editor'
import layers from 'api/layer'
import selections from 'api/selection'


// Constants
//

let parentsByElementId = {}
let elementsByElementId = {}
let layersByName = {}

function clearCaches_() {
    parentsByElementId = {}
    elementsByElementId = {}
    layersByName = {}
}

// Functions
//
function clear() {
    const store = useStore()
    // TODO: Really make full clear
    store.scene.elements = []
    clearCaches_()
}

// create a new scene
//
function create() {
    clear()
    selections.clear()
    editor.clear()
}

// save the scene
//
function save(name) {
    const store = useStore()
    const messagesStore = useMessageStore()

    const successFn = function (data, name) {
        console.log("data", data)
        messagesStore.messages.push(`Saved ${name}`)
    }

    io.save(store.scene, name, successFn)
}

// Help set scene after loading
function set_(scene) {
    const store = useStore()
    store.scene = scene

    // Fill caches
    //
    forEach(storeParent)

}

// Load scene by name
//
function load(name) {

    let onLoaded = function (scene, name) {
        set_(scene)
        layers.selectFirst()
        api.message.create(`Loaded ${name}`) // api.message.create
    }

    io.load(name, onLoaded)
}

// TODO:
// TODO: CACHING AND REFACTORING
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

// get the element by its id
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

// add a new layer to scene
//
function addLayer(layer, parentLayer) {
    const store = useStore()
    // TODO: Add layer on Top ?
    if (parentLayer == undefined) {
        store.scene.elements.push(layer)
    } else {
        parentLayer.elements.push(layer)
    }
}

// elements of scene
// 
function elements() {
    const store = useStore()
    return store.scene.elements
}

// Stores the parent of an element
//
function storeParent(parent, element) {
    parentsByElementId[element.id] = parent
    console.log("storeParent", parentsByElementId)
}

// get the stored parent of an element
//
function getParent(element) {
    console.log("getParent - element:", element)
    console.log("getParent - parentsByElementId", parentsByElementId)
    return parentsByElementId[element.id]
}

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
            // Add to cache
            layersByName[name] = found
            //
            return found
        }
    }

    return undefined
}

// helper for for each function
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

// for each element in the scene
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

// create an element
// e.g. createElement('line' {p1, isRelative1, p2, isRelative2})
//
function createElement(type, props) {

}

// same as createElement('layer', props)
//
function createLayer(props) {

}

// set set the current layer of scene
//
function setCurrentLayer(layer) {

}


// Exports
//
export default {
    load, // TODO: perhaps move outside
    save, // TODO: perhaps move outside
    //
    create, // TODO: What is the difference between create or clear
    clear,
    //
    createLayer,
    createElement,
    //
    addLayer,  // like. scene.appendChild
    //
    storeParent, // TODO: should not public API
    getParent,
    getLayerByName,
    getElementById, // like document.getElementById
    elements, // element.childNodes
    //
    forEach, // TODO: rename Tree Walker
    //
    setCurrentLayer

}



