// ElementFn.js

// - Element have id, type
// - Element have attributes
// - Element can get attributes (readonly)
// - Element can set attribute value for key
// - Element can get value of attribute

// Imports
//
import IElement from 'api/element' // "api/intern/element" TODO: Internal API
import PObject from 'fnSets/Object'
import { Status as PStatus } from 'fnSets/Status'

// Local Constants
//
const fns_type_ = 'elementFn'

// Local variables
//
let obj_ = undefined

// Exports
//
export default {
    getFnType,
    setObject,
    //
    create,
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
    return fns_type_
}

function setObject(obj) {
    if (obj.hasFn(getFnType())) {
        obj_ = obj.getInternal() // OK .. UnWrap
    } else {
        obj_ = undefined
    }
}

function create(type, attrs) {
    let internalObj = IElement.create(type, attrs)
    let publicObj = PObject.create(internalObj)
    return [publicObj, PStatus.kSuccess]
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
    let attrs = Object.freeze(Object.create(obj_))
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