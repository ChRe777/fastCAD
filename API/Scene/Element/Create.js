// Create.js

// Imports
//
import { defaults } from 'services/defaults'
import { addPoints } from 'services/utils'
import { useStore } from 'stores/store'
//
import api from 'api/api'

// Constants
//
// Create unique id
// see https://shortunique.id
//
const { randomUUID } = new ShortUniqueId({ length: 10 });

// Functions
//

// create('line', {x1:0,y1:0,x2:0,y2:0}) -> 'line-1'
//
function create(type, attrs) {

    // Create new object/element
    //
    let obj = {
        'type': type,
        'id': type + '-' + randomUUID(),
        ...attrs
    }

    return obj
}

function line(attrs) {

    let [p1, relative1] = attrs["p1"]
    let [p2, relative2] = attrs["p2"]

    const store = useStore()

    if (relative1) {
        p1 = addPoints(store.lastPoint, p1)
    }

    if (relative2) {
        p2 = addPoints(p1, p2)
    }

    const obj = create('line', {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    store.lastPoint = p2
    return obj
}
function lineTo(attrs) {

    let [p2, relative2] = attrs['p2']

    const store = useStore()

    if (store.lastPoint === undefined) {
        return undefined
    }

    let p1 = store.lastPoint

    if (relative2) {
        p2 = addPoints(p1, p2)
    }

    const obj = create('line', {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    store.lastPoint = p2
    return obj
}
function circle(attrs) {

    let [p, relative] = attrs["p"]
    let r = attrs["r"]

    const store = useStore()

    if (relative && store.lastPoint !== undefined) {
        p = addPoints(store.lastPoint, p)
    }

    const obj = create('circle', {
        cx: p.x,
        cy: p.y,
        r: r,
        'fill': defaults.style.fill,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    store.lastPoint = p
    return obj
}

function ellipse(attrs) {

    let [p, relative] = attrs['p']
    let rx = attrs['rx']
    let ry = attrs['ry']

    const store = useStore()

    if (relative && store.lastPoint !== undefined) {
        p = addPoints(store.lastPoint, p)
    }

    const obj = create('ellipse', {
        cx: p.x,
        cy: p.y,
        rx: rx,
        ry: ry,
        'fill': defaults.style.fill,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    store.lastPoint = p
    return obj
}

function text(attrs) {

    let [p, relative] = attrs['p']
    let text = attrs['text']

    const store = useStore()

    if (relative && store.lastPoint !== undefined) {
        p = addPoints(store.lastPoint, p)
    }

    const obj = create('text', {
        x: p.x,
        y: p.y,
        text: text,
        'font-family': defaults.font.family,
        'font-size': defaults.font.size,
        'fill': defaults.style.fill,
        'stroke': defaults.style.stroke,
        'stroke-width': 1 //defaults.style['stroke-width']
    })

    store.lastPoint = p
    return obj
}

function path(attrs) {

    let d = attrs['d']

    const store = useStore()

    const obj = create('path', {
        d: d,
        plen: '',
        'fill': defaults.style.fill,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    store.lastPoint = { x: 0, y: 0 }
    return obj
}

function createPoints(pointsWithRel) {
    const store = useStore()

    let lastPoint = store.lastPoint
    let points = []

    pointsWithRel.forEach((pointRel) => {
        console.log("pointRel", pointRel)
        let [p, relative] = pointRel
        if (relative) {
            p = addPoints(lastPoint, p)
        }

        lastPoint = p
        points.push(p)
    })
    return [points, lastPoint]
}

function polyline(attrs) {

    // [ [{10,10}, false],  [{20,30}, true], ...]

    let [points, lastPoint] = createPoints(attrs['points'])
    let pointsStr = points.map(p => `${p.x},${p.y}`).join(' ')

    let obj = create('polyline', {
        points: pointsStr,
        plen: '',
        'fill': 'none',
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    const store = useStore()
    store.lastPoint = lastPoint
    return obj
}

function polygon(attrs) {

    let [points, lastPoint] = createPoints(attrs['points'])
    let pointsStr = points.map(p => `${p.x},${p.y}`).join(' ')

    const obj = create('polygon', {
        'points': pointsStr,
        'plen': '',
        'fill': defaults.style.fill,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    const store = useStore()
    store.lastPoint = lastPoint
    return obj
}

function relToAbs(pRel) {
    const store = useStore()
    let lastPoint = store.lastPoint
    let [p, relative] = pRel
    if (relative) {
        p = addPoints(lastPoint, p)
    }
    store.lastPoint = p
    return p
}


function image(attrs) {

    let pRel = attrs['p']
    let sizeRel = attrs['size']
    let href = attrs['href']

    console.log("pRel", pRel)
    let p = relToAbs(pRel)
    let size = relToAbs(sizeRel)

    const obj = create('image', {
        x: p.x,
        y: p.y,
        width: size.x,
        height: size.y,
        href: href,
        'fill': defaults.style.fill,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    const store = useStore()
    store.lastPoint = p

    return obj
}

function rect(attrs) {

    let pRel = attrs['p']
    let sizeRel = attrs['size']

    let p = relToAbs(pRel)
    let size = relToAbs(sizeRel)

    const obj = create('rect', {
        x: p.x,
        y: p.y,
        width: size.x,
        height: size.y,
        'fill': defaults.style.fill,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    const store = useStore()
    store.lastPoint = p

    return obj
}

function group(elements) {

    const obj = create('g', {
        'elements': elements,
        'fill': defaults.style.fill,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    let currentLayer = api.layer.getCurrent()
    elements.forEach(element => {
        api.layer.removeElement(currentLayer, element)
    })

    //store.lastPoint = p

    return obj
}

// creates a new layer
//
function layer(attrs) {

    let name = attrs['name']
    let description = attrs['description']

    const obj = create("layer", {
        'svg-type': 'g',
        'name': name,
        'description': description,
        "elements": [],
        "isopen": false,
        "visibility": "visible",
        ...defaults.layer
    })

    return obj
}

// -------------------

// Copy is creating a new element
// and copy the attribute to new element
//
function duplicate(element) {
    let { id, type, ...attrs } = element
    return create(type, attrs) // get a new id here
}

// Exports
//
export default {
    line,
    lineTo,
    circle,
    ellipse,
    text,
    path,
    polyline,
    polygon,
    image,
    rect,
    //
    layer,
    group,
    //
    duplicate
}