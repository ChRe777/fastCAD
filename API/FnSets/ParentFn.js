// ParentFn.js

// - Parents can have zero or n childs
// - Parents can check of they have childs
// - Parents can add a child
// - Parents can remove child
// - Parents can return childs (readonly)

// Local variables
//
let obj_ = undefined

// Local constants
//
const fns_type__ = 'parentFn'

// Export
//
export default {
    getFnType,
    setObject,
    //
    hasChilds,
    appendChild,
    removeChild,
    childs,
}

// Public Functions
//

function getFnType() {
    return fns_type__
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

function appendChild(child) {
    if (!obj_) return undefined
    obj_.elements.push(child)
    return child
}

function removeChild(child) {
    if (!obj_) return undefined
    if (!obj_.elements) return undefined
    obj_.elements = obj_.elements.filter(child_ => child_.id !== child.id)
    return child
}

function childs() {
    if (!obj_) return undefined
    // https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
    let clone = [...obj_.elements];
    return clone
}

