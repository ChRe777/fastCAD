function ellipseToPath(cx, cy, rx, ry) {
    let path = `
    M ${cx - rx} ${cy}
    a ${rx},${ry} 0 1,0 ${+2 * rx}, 0
    a ${rx},${ry} 0 1,0 ${-2 * rx}, 0`
    return path
}

function circleToPath(cx, cy, r) {
    let path = ellipseToPath(cx, cy, r, r)
    return path
}

function lineToPath(x1, y1, x2, y2) {
    let path = `M ${x1} ${y1} L ${x2} ${y2}`
    return path
}

// points="0,100 50,25 50,75 100,0"

function polyToPath(points, closed = false) {
    let xys = points.split(" ")
    if (closed && xys.length > 0) {
        xys.push(xys[0]) // First == Last
    }
    let path = xys.map((xy_, i) => {
        let xy = xy_.trim().split(',').map(x => x.trim())
        let x = xy[0]; let y = xy[1]
        return (i == 0) ? `M ${x} ${y}` : `L ${x} ${y}`
    }).join(' ')
    return path
}

function polygonToPath(points) {
    let path = polyToPath(points, true)
    return path
}

function polylineToPath(points) {
    let path = polyToPath(points)
    return path
}

function rectToPath(x, y, width, heigth) {
    let path = `M ${x} ${y} 
    l ${width} 0 
    l 0 ${heigth} 
    l ${-width} 0 
    Z `//L ${x} ${y}`
    return path
}

export default {
    polylineToPath,
    polygonToPath,
    lineToPath,
    circleToPath,
    ellipseToPath,
    rectToPath
}