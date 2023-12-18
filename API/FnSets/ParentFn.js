// ParentFn.js

// Local variables
//

let obj_ = undefined

// Local constants
//
const type_ = 'parentFn'
const compatibleTypes_ = ['layer', 'g', 'svg']

// Export
//
export default {
    getType,
    setObject,
    isCompatible,
    hasChilds,
    appendChild,
    removeChild
}

// Public Functions
//

function getType() {
    return type_
}

function isCompatible(obj) {
    return compatibleTypes_.includes(obj.type)
}

function setObject(obj) {
    if (obj.hasFn(getType())) {
        obj_ = obj.getInternal()
    } else {
        obj_ = undefined
    }
}

function hasChilds() {
    if (!obj_) return undefined
    if (!obj_.elements) return false
    return obj_.elements.length > 0
}

function appendChild(child) {
    if (!obj_) return undefined
    obj_.elements.push(child)
    return true
}

function removeChild(child) {
    if (!obj_) return undefined
    obj_.elements = obj_.elements.filter(child_ => child_.id !== child.id)
    return true
}

