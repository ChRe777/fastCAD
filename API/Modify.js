// Modify.js

// Imports
//
import move from 'api/modify/move'
import mirror from 'api/modify/mirror'
import layer from 'api/modify/layer'

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
    mirror,
    layer
}
