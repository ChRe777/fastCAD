// SceneFn.js
//

// Imports
//
import { useCacheStore } from 'stores/cache'
import object from './Object.js'

//  Local variable
//
let obj_ = undefined

// Local constants
//
const type_ = 'sceneFn'


// Exports
//
export default {
    getType,
    setObject,
    //
    getElementById,
    //
    forEach
}

// Public Functions
//

function setObject(obj) {
    if (obj.hasFn(getType())) {
        obj_ = obj.getInternal() // OK .. UnWrap
    } else {
        obj_ = undefined
    }
}

function getType() {
    return type_
}

function getElementById(id) {
    if (!obj_) {
        console.error("SceneFn - Object not set")
        return undefined
    }
    const cacheStore_ = useCacheStore()
    return cacheStore_.getElementById(id)
}

function forEach_(fn, parent, element) {

    // Go out, so wrap internal objects
    //
    fn(object.create(parent), object.create(element))

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

    if (!obj_) {
        console.error("SceneFn - Object not set")
        return
    }

    let scene = obj_
    let parent = scene
    for (let element of parent.elements) {
        forEach_(fn, parent, element)
    }
}