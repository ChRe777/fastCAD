// LayerFn.js

// - Layer is a special object like svg group element
// - Layers can be frozen and thawed
// - Layers can be invisble with all their childs
// - Layers can have childs


import ICreate from 'api/create'
import PObject from 'fnSets/Object'
import { Status as PStatus } from 'fnSets/Status'

//  Local variable
//

let obj_ = undefined

// Local constants
//
const fns_type_ = 'layerFn'

// Exports

export default {
    getFnType,
    setObject,
    //
    create,
    //
    isOpen,
    isFrozen,
    isVisible
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
    return fns_type_
}

function create(attrs) {
    //
    // see Douglas Crockford = https://gist.github.com/benpriebe/55b7e950b5e9d056b47e
    //
    // let { name, description } = attrs

    let internalObj = ICreate.layer(attrs)

    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
    //
    let publicObj = PObject.create(internalObj)

    return [publicObj, PStatus.kSuccess]
}


// Determines whether or not the Function Set is compatible 
// with the specified Maya Object within the API RTTI system.
// see https://download.autodesk.com/us/maya/2009help/API/class_m_fn_base.html#e51343953da0480b0a607a3eab112032

function isOpen() {
    if (!obj_) return undefined
    return obj_['isopen']
}

function isFrozen() {
    if (!obj_) return undefined
    return obj_['isfrozen']
}

function isVisible() {
    if (!obj_) return undefined
    return obj_['visibility'] === 'visible'
}