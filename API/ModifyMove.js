// ModifyMove.js

// Imports
//
import { addPoints, subPoints } from 'services/utils'

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

function move(element, p, relative) {
    if (element.type === 'circle') {
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
    else if (element.type === 'polyline') {
        movePointsXY(p, 'points', relative, element)
    }
    else if (element.type === 'polygon') {
        movePointsXY(p, 'points', relative, element)
    }
    else if (element.type === 'path') {
        // TODO: M 0 0 m 30 30
    }
}


// Exports
//

