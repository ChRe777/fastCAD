// Move.js

// Imports
//
import { addPoints, subPoints } from 'services/utils'
import { SVGPathData } from 'svg-pathdata'

// Functions
//

function moveGeneric1(d, attrs /*axis*/, relative, element) {
    attrs.forEach(attr => { // e.g. cx, cy or x1, x2
        if (relative) {
            // cx = "30" -> 30
            element[attr] = parseFloat(element[attr]) + d
        } else {
            element[attr] = d
        }
    })
}

function moveGeneric2(p, xs, ys, relative, element) {
    moveGeneric1(p.x, xs, relative, element)
    moveGeneric1(p.y, ys, relative, element)
}

function toPoint(xy) {
    xy = xy.split(',').map(parseFloat)
    console.log("toPoint", xy)
    return {
        x: xy[0],
        y: xy[1],
    }
}

function toXY(p) {
    return p.x + "," + p.y
}

function movePointsXY(p, attr, relative, element) {
    let xys = element[attr].split(" ")

    if (!relative) {
        let p1 = toPoint(xys[0])
        p = subPoints(p, p1)
    }

    let zs = xys
        .map(toPoint)
        .map((x) => addPoints(p, x))
        .map(toXY)

    element[attr] = zs.join(" ")
}

function movePathPoints(p, relative, element) {
    // see https://github.com/nfroidure/svg-pathdata/
    // console.log(pathData.commands);
    // [  {type: SVGPathData.MOVE_TO,       relative: false,  x: 10,  y: 10},

    function getStartPoint(pathData) {
        let cmd = pathData.commands[0]
        if (cmd && cmd.type === SVGPathData.MOVE_TO && cmd.relative === false) {
            return {
                x: cmd.x,
                y: cmd.y
            }
        }
        return undefined
    }

    let pathData = new SVGPathData(element.d)

    function translate(p) {
        element.d = pathData.translate(p.x, p.y).encode()
    }

    if (relative) {
        translate(p)
    } else {
        let sp = getStartPoint(pathData)
        p = subPoints(p, sp)
        translate(p)
    }
}

// Move
//
function move(element, p, relative) {
    if (element.type === 'circle' || element.type === 'ellipse') {
        moveGeneric2(p, ['cx'], ['cy'], relative, element)
    }
    else if (element.type === 'line') {
        moveGeneric2(p, ['x1', 'x2'], ['y1', 'y2'], relative, element)
    }
    else if (element.type === 'image') {
        moveGeneric2(p, ['x'], ['y'], relative, element)
    }
    else if (element.type === 'text') {
        moveGeneric2(p, ['x'], ['y'], relative, element)
    }
    else if (element.type === 'rect') {
        moveGeneric2(p, ['x'], ['y'], relative, element)
    }
    else if (element.type === 'polyline') {
        movePointsXY(p, 'points', relative, element)
    }
    else if (element.type === 'polygon') {
        movePointsXY(p, 'points', relative, element)
    }
    else if (element.type === 'path') {
        movePathPoints(p, relative, element)
    }
}


// Exports
//
export default {
    move
}
