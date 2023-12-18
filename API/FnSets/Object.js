// Object.js
//

//  Wraps an internal object
//
//  ObjectWarpped-[-> internal Object ]

// Constants // TODO: Move to a Registry STORE, because of Plugins
//
const fnsTypesCompatibleWithObjType_ = {
    'sceneFn': ['svg'],
    'layerFn': ['layer'],
    'parentFn': ['layer', 'g', 'svg'],
    'childFn': ['layer', 'group', 'circle', 'polyline', 'image', 'path'],
    'elementFn': ['layer', 'group', 'circle', 'polyline', 'image', 'path'],
    'polylineFn': ['polyline', 'polygon'],
    'ellipseFn': ['circle', 'ellipse'],
    'pathFn': ['path']
}

// Local variables
//

// let obj_ = undefined

// Exports
//
export default {
    create
}

function create(obj) {
    const obj_ = obj

    function isCompatible_(fnsType) {
        if (!obj_) return undefined
        let type_ = getType()
        return fnsTypesCompatibleWithObjType_[fnsType].includes(type_)
    }

    function isEmpty() {
        return obj_ === undefined
    }

    function getType() {
        return obj_.type
    }

    function getInternal() {
        return obj_
    }

    function hasFn(fnsType) {
        if (!obj_) return undefined
        return isCompatible_(fnsType)
    }

    return {
        isEmpty,
        getType,
        hasFn,
        getInternal
    }
}