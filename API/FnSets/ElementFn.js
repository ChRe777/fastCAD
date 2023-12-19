// ElementFn.js

// - Element have id, type
// - Element have attributes
// - Element can get attributes (readonly)
// - Element can set attribute value for key
// - Element can get value of attribute

// Local Constants
//
const fns_type__ = 'elementFn'

// Local variables
//
let obj_ = undefined

// Exports
//
export default {
    getFnType,
    setObject,
    //
    getId,
    getType,
    //
    attributes,
    setAttribute,
    getAttribute
}

// Public Functions
//

function getFnType() {
    return fns_type__
}

function setObject(obj) {
    if (obj.hasFn(getFnType())) {
        obj_ = obj.getInternal() // OK .. UnWrap
    } else {
        obj_ = undefined
    }
}

function getId() {
    if (!obj_) return undefined
    return obj_['id']
}

function getType() {
    if (!obj_) return undefined
    return obj_['type']
}

function attributes() {
    if (!obj_) return undefined

    // https://www.freecodecamp.org/news/clone-an-object-in-javascript/
    let attrs = Object.assign({}, obj_)
    return attrs
}

function setAttribute(key, value) {
    if (!obj_) return undefined
    if (obj_.hasOwnProperty(key)) {
        obj_[key] = value
    }
}

function getAttribute(key) {
    if (!obj_) return undefined
    if (obj_.hasOwnProperty(key)) {
        return obj_[key]
    }
    return undefined
}