// Mirror.js

// Imports 
//
import modify from 'api/modify'

// Exports
//
export default {
    mirror
}

// Functions
//
function mirror(element, axis, value) {

    let attrsMirrored = {}
    const type = element['type']

    // line 
    //
    if (type === 'line') {
        if (axis === 'y') {
            attrsMirrored['x1'] = ((parseFloat(element['x1']) - value) * -1.0) + value
            attrsMirrored['x2'] = ((parseFloat(element['x2']) - value) * -1.0) + value
        }
        if (axis === 'x') {
            attrsMirrored['y1'] = ((parseFloat(element['y1']) - value) * -1.0) + value
            attrsMirrored['y2'] = ((parseFloat(element['y2']) - value) * -1.0) + value
        }
    }

    modify(element, type, attrsMirrored)
}


