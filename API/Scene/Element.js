// Element.js

// All create_ elements are registered
// When they are create_d they are not part of the scene
// When they are appended to a parent in scene they are part of scene
// The scene is a tree
// The first level of scene are layers

// Imports
//
import create_ from 'api/create'
import modify from 'api/modify'

// Exports
//
export default {
    // create
    create,
    duplicate,
    // modify
    //
    move,
    rotate,
    mirror,
    // attributes
    //
    getType,
    hasChilds,
    getChilds,
    getChildsCount,
    getAttributes,
    setAttribute
}


// api.element.create_ // create_ element and then later it will added to scene

// SCENEGRAPH
// ----------
// element.getById
// element.removeChild
// element.appendChild
// element.replaceChild
// element.insertBefore
// element.parentNode
// element.nextSibling
// element.previousSibling

// ELEMENT
// -------
// element.nodeType
// element.childNodes
// element.hasChildNodes
// element.childElementCount

// TODO: PlugIn Architecture
//
let typecreate_Map = {
    'ellipse': create_.ellipse,
    'circle': create_.circle,
    'image': create_.image,
    'line': create_.line,
    'lineTo': create_.lineTo,
    'path': create_.path,
    'polyline': create_.polyline,
    'polygon': create_.polyline,
    'rect': create_.rect,
    'text': create_.text,
    //
    'group': create_.group,
    'layer': create_.layer,
}

// Functions
//

// Create element of given type
//
function create(type, attrs) {
    const fn = typecreate_Map[type]
    if (fn) {
        const fn = typecreate_Map[type]
        const newElement = fn(attrs)
        return newElement
    }
    console.err(`create function for '${type}' not defined!`)
    return undefined
}

// Duplicate
//
function duplicate(element) {
    return create_.duplicate(element)
}

// Move
//
function move(element, attrs) {
    let pRel = attrs['p']
    let [p, relative] = pRel

    modify.move.move(element, p, relative)
}

// Rotate
//
function rotate(element, attrs) {

    let angle = attrs['angle']
    let [p, relative] = attrs['p']

    modify.rotate.rotate(element, angle, p, relative)
}

// Mirror
//
function mirror(element, attrs) {

    let axis = attrs['axis']
    let value = attrs['value']
    let copy = attrs['copy']

    if (copy) {
        element = api.element.copy(element)
    }
    modify.mirror.mirror(element, axis, value)
}

// Get type
//
function getType(element) {
    return element.type
}

// Has Childs?
//
function hasChilds(element) {
    if (element.elements && Array.isArray(element.elements)) {
        return element.elements.length > 0
    }
    return false
}

// Get childs
//
function getChilds(element) {
    return element.elements
}

// Get childs count
// TODO: Also subchilds ??
//
function getChildsCount(element) {
    if (element.elements && Array.isArray(element.elements)) {
        return element.elements.length
    }
    return 0
}

// Get attributes
//
function getAttributes(element) {
    let attrs = {}
    Object.assign(attrs, element)
    return attrs
}

// Set attribute
//
function setAttribute(element, attr) {
    modify.assign(element, element.type, attr)
}