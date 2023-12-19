// ChildFn.js

// Imports
//
import { useCacheStore } from 'stores/cache'
import object from './Object.js'

// Local Constants
//
const type_ = 'childFn'

// Local variables
//
let obj_ = undefined

// Exports
//
export default {
    getType,
    setObject,
    getParent
}

// Public Functions
//

function getType() {
    return type_
}

function setObject(obj) {
    if (obj.hasFn(getType())) {
        obj_ = obj.getInternal() // OK .. UnWrap
    } else {
        obj_ = undefined
    }
}

function getParent() {
    if (!obj_) return undefined
    let child = obj_
    const cacheStore_ = useCacheStore()
    let parent = cacheStore_.getParent(child.id)
    return object.create(parent) // Go out -> wrap it
}