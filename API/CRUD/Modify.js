// Modify.js

// Modifies elements, but not modifies the scene
// Not modify the parent child relationsships

// Imports
//
import move from 'api/modify/move'
import rotate from 'api/modify/rotate'
import mirror from 'api/modify/mirror'

// modify
//
function modify(element, type, attrs) {
    if (element === undefined) {
        return
    }

    console.log("modify", element.type, type)
    if (type === 'layer') {
        type = 'g'
    }

    if (element.type === type) {
        Object.assign(element, attrs)
    }
    return element
}

// Exports
//
export default {
    modify, // Base Function
    move,
    rotate,
    mirror
}
