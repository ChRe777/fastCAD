// Create.js

// Imports
//
import { defaults } from 'services/defaults'

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

    if (type === 'layer') {
        return createLayer_(type, attrs)
    }

    // Create new object
    //
    let obj = {
        "type": type,
        "id": type + "-" + randomUUID(),
        ...attrs
    }

    // Place into current active Layer
    //
    let currentLayer = getCurrentLayer()
    currentLayer.elements.push(obj)

    // Store last created element
    //
    const store = useStore()
    store.lastCreatedElement = obj

    return obj
}

function createLine(p1, relative1, p2, relative2) {

    const store = useStore()

    if (relative1) {
        p1 = addPoints(store.lastPoint, p1)
    }

    if (relative2) {
        p2 = addPoints(p1, p2)
    }

    create('line', {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    store.lastPoint = p2
}

function createLineTo(p2, relative2) {

    const store = useStore()

    if (store.lastPoint !== undefined) {
        p1 = store.lastPoint
    }

    if (relative2) {
        p2 = addPoints(p1, p2)
    }

    create('line', {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    store.lastPoint = p2
}

function createCircle(p, relative, r) {

    const store = useStore()

    if (relative && store.lastPoint !== undefined) {
        p = addPoints(store.lastPoint, p)
    }

    create('circle', {
        cx: p.x,
        cy: p.y,
        r: r,
        fill: defaults.style.fill,
        stroke: defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    store.lastPoint = p
}

function createText(p, relative, text) {

    const store = useStore()

    if (relative && store.lastPoint !== undefined) {
        p = addPoints(store.lastPoint, p)
    }

    create('text', {
        x: p.x,
        y: p.y,
        text: text,
        "font-family": defaults.font.family,
        "font-size": defaults.font.size,
        "fill": defaults.style.fill,
        "stroke": defaults.style.stroke,
        "stroke-width": 0 //defaults.style['stroke-width']
    })

    store.lastPoint = p
}

function createPath() {

    const store = useStore()

    create('path', {
        d: "M 0 0 h 100 v 100",
        plen: "",
        "fill": defaults.style.fill,
        "stroke": defaults.style.stroke,
        "stroke-width": defaults.style['stroke-width']
    })

    store.lastPoint = { x: 0, y: 0 }
}

function createPolyline() {

    const store = useStore()

    create('polyline', {
        points: "0,0 100,0",
        plen: 10,
        "fill": defaults.style.fill,
        "stroke": defaults.style.stroke,
        "stroke-width": defaults.style['stroke-width']
    })

    store.lastPoint = { x: 0, y: 0 }
}

function createPolygon() {

    const store = useStore()

    create('polygon', {
        points: "0,0 200,200",
        plen: 10,
        "fill": defaults.style.fill,
        "stroke": defaults.style.stroke,
        "stroke-width": defaults.style['stroke-width']
    })

    store.lastPoint = { x: 0, y: 0 }
}

// Exports
//
export default {
    createLine,
    createLineTo,
    createCircle,
    createText,
    createPath,
    createPolyline,
    createPolygon
}