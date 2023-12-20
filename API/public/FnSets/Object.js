// Object.js

//  - The object is wrapper that wraps an internal object
//  - You can not access data inside the object directly
//  - Compatible function set can unwrap the internal object
//    and the data can accessed through their public functions
//
//  ObjectWrapper-[-> internal Object ]

/*
           Wrapper
        +-----------+
        | +-------+ |
        | |  int  | |
        | |  obj  | |
        | +-------+ |
        +-----------+
*/

/*
            fnSet
        +-----------+
        | +-------+ |
        | |  int  | o--- fn 1
        | |  obj  | o--- fn 2
        | +-------+ |
        +-----------+

*/

// Imports
//
import { Status as PStatus } from 'fnSets/Status'

// Constants // TODO: Move to a Registry STORE, because of Plugins
//

// FnSets Compatibility
//
const fnsTypesCompatibleList_ = {
    'sceneFn': ['svg'],
    'layerFn': ['layer'],
    //
    'parentFn': ['layer', 'g', 'svg'],
    'childFn': ['layer', 'g', 'line', 'circle', 'ellipse', 'polyline', 'polygon', 'rect', 'image', 'path', 'text'],
    'elementFn': ['svg', 'layer', 'g', 'line', 'circle', 'ellipse', 'polyline', 'polygon', 'rect', 'image', 'path', 'text'],
    //
    'polylineFn': ['polyline', 'polygon'],
    'ellipseFn': ['circle', 'ellipse'],
    'pathFn': ['path'],
    'textFn': ['text']
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

    // Private 
    //
    const obj_ = obj

    function isCompatible_(fnsType) {
        if (!obj_) return undefined
        let fns_type_ = getType()
        return fnsTypesCompatibleList_[fnsType].includes(fns_type_)
    }

    // Public functions
    //
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

    //
    // see Douglas Crockford = https://gist.github.com/benpriebe/55b7e950b5e9d056b47e
    //

    const publicObj = Object.freeze({
        isEmpty,
        getType,
        hasFn,
        getInternal
    })
    return publicObj
}