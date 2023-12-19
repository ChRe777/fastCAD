// LayerFn.js

// - Layer is a special object like svg group element
// - Layers can be frozen and thawed
// - Layers can be invisble with all their childs
// - Layers can have childs

//  Local variable
//
let obj_ = undefined

// Local constants
//
const fns_type__ = 'layerFn'

// Exports

export default {
    getFnType,
    setObject,
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
    return fns_type__
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