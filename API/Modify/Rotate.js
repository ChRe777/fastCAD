// Rotate.js

// Imports
//
import { SVGPathData } from 'svg-pathdata'

// Functions
//
function rotate(element, angle, p, relative) {
    if (element.type === 'path') {
        let pathData = new SVGPathData(element.d)
        console.log(angle, p)
        element.d = pathData.rotate(angle, p.x, p.y).encode()
    }
}

// Exports
//
export default {
    rotate
}