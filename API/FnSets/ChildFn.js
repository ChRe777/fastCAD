// ChildFn.js

// Childs have parents

// Imports
//
import { useCacheStore } from 'stores/cache'
import object from './Object.js'

// Local Constants
//
const fns_type__ = 'childFn'

// Local variables
//
let obj_ = undefined

// Exports
//
export default {
    getFnType,
    setObject,
    getParent
}

// Public Functions
//

function getFnType() {
    return fns_type__
}

function setObject(obj) {
    if (obj.hasFn(getFnType())) {
        obj_ = obj.getInternal() // Compatibility OK -> So UnWrap it
    } else {
        obj_ = undefined
    }
}

function getParent() {
    if (!obj_) return undefined

    let child = obj_

    // in cache are internal objects
    //
    const cacheStore_ = useCacheStore()
    let parent = cacheStore_.getParent(child.id)

    return object.create(parent) // Go out -> wrap it
}