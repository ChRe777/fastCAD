// Rotate.js

// Imports
//
import { SVGPathData } from 'svg-pathdata'

// Exports
//
export default {
    rotate
}

// Functions
//
function rotate(element, angle, p, relative) {
    // TODO: What to do with relative?
    if (element.type === 'path') {
        let pathData = new SVGPathData(element.d)
        element.d = pathData.rotate(angle, p.x, p.y).encode()
    } else {
        console.error("Not implement for type:", element.type)
    }
}

