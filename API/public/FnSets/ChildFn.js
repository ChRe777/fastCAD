// ChildFn.js

//  - Childs have parents

// Imports
//
import { useCacheStore } from 'stores/cache'
import { Status as PStatus } from 'fnSets/Status'
import PObject from 'fnSets/Object'

// Local Constants
//
const fns_type_ = 'childFn'

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
    return fns_type_
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

    // In cache are internal objects
    //
    const cacheStore_ = useCacheStore()
    let parent = cacheStore_.getParent(child.id)

    return [PObject.create(parent), PStatus.kSuccess] // Go out -> wrap it
}