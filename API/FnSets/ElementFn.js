// ElementFn.js

// Local Constants
//
const type_ = 'elementFn'

// Local variables
//
let obj_ = undefined

// Exports
//
export default {
    getType,
    setObject,
    getId
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

function getId() {
    if (!obj_) return undefined
    return obj_['id']
}