// Element.js


// Imports
//

import crud from 'api/create'

// api.element.getById
// api.element.create // Create element and then later it will added to scene

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

// TODO: PlugIn Architecture
//
let typeCreateMap = {
    // TODO: Layer
    'ellipse': crud.ellipse,
    'circle': crud.circle,
    'group': crud.group,
    'image': crud.image,
    'line': crud.line,
    'lineTo': crud.lineTo,
    'path': crud.path,
    'polyline': crud.polyline,
    'polygon': crud.polyline,
    'rect': crud.rect,
    'text': crud.text,
}

// Create an element from given type and attrs
//
function create(type, attrs) {
    const fn = typeCreateMap[type]
    if (fn) {
        const fn = typeCreateMap[type]
        const newElement = fn(attrs)
        console.log("newElement", newElement)
        return newElement
    }
    console.err(`Create function for '${type}' not defined!`)
    return undefined
}

// All create elements are registered
// When they are created they are not part of the scene
// When they are appended to a parent in scene they are part of scene
// The scene is a tree
// The first level of scene are layers

// Exports
export default {
    create,
    //modify,
    //remove,
    //
    //type,
    //hasChilds,
    //getChilds,
    //getChildsCount
    //getAttributes
}