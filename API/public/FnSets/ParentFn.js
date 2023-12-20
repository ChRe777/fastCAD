// ParentFn.js

// - Parents can have zero or n childs
// - Parents can check of they have childs
// - Parents can add a child
// - Parents can remove child
// - Parents can return childs (readonly)

// Imports
//
import PObject from 'fnSets/Object'
import ElementFn from 'fnSets/ElementFn'

// Local variables
//
let obj_ = undefined

// Local constants
//
const fns_type_ = 'parentFn'

// Export
//
export default {
    getFnType,
    setObject,
    //
    hasChilds,
    appendChild,
    removeChild,
    getChilds,
}

// Public Functions
//

function getFnType() {
    return fns_type_
}

function setObject(obj) {
    if (obj.hasFn(getFnType())) {
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

function appendChild(pchild) {
    if (!obj_) return undefined
    if (!obj_.elements) return undefined // TODO: Error
    let internalObj = pchild.getInternal()
    obj_.elements.push(internalObj)
    return pchild
}

function removeChild(pchild) {
    if (!obj_) return undefined
    if (!obj_.elements) return undefined // TODO Error Status

    ElementFn.setObject(pchild)
    const id = ElementFn.getId()

    obj_.elements = obj_.elements.filter(child_ => child_.id !== id)
    return pchild
}

function getChilds() {
    if (!obj_) return undefined
    if (!obj_.elements) return undefined

    // Internal Object go out -> wrapped all
    //
    return obj_.elements.map(PObject.create)
}

