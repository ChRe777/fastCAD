// LayerFn.js

//  Local variable
//
let obj_ = undefined

// Local constants
//
const type_ = 'layerFn'

// Exports

export default {
    getType,
    setObject,
    isOpen,
    isFrozen,
    isVisible
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