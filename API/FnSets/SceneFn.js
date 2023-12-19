// SceneFn.js

// Scene is like the document in a html page

// Imports
//
import { useCacheStore } from 'stores/cache'
import object from './Object.js'

//  Local variable
//
let obj_ = undefined

// Local constants
//
const fns_type__ = 'sceneFn'


// Exports
//
export default {
    getFnType,
    setObject,
    //
    getElementById,
    //
    forEach
}

// Public Functions
//

function setObject(obj) {
    if (obj.hasFn(getFnType())) {
        obj_ = obj.getInternal() // OK .. UnWrap
    } else {
        obj_ = undefined
    }
}

function getFnType() {
    return fns_type__
}

function getElementById(id) {
    if (!obj_) return undefined

    const cacheStore_ = useCacheStore()
    const element = cacheStore_.getElementById(id)

    const wrappedParent = object.create(element)
    return wrappedParent
}

function forEach_(fn, parent, element) {

    // Go out, so wrap internal objects
    //
    const wrappedParent = object.create(parent)
    const wrappedElement = object.create(element)
    fn(wrappedParent, wrappedElement)

    // Go down next level
    //
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

    if (!obj_) {
        console.error("SceneFn - Object not set")
        return
    }

    const scene = obj_
    for (let element of scene.elements) {
        const parent = scene
        forEach_(fn, parent, element)
    }
}