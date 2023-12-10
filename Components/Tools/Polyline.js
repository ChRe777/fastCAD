// PolyLineTool.js

// Each tool has handlers that where add to the element
// when the tool is activated and removed when the tool
// is deactivated.

// Imports
//
import api from 'api/api'
import { useEditorStore } from 'stores/editor'

// Local variables
//
let resolvePoint = null
let circle = null
let savedCursor = null
let polyline = undefined
let points = []

// Constants
//
const LEFT_BUTTON = 0
const RIGHT_BUTTON = 2

// Handler functions
//

function onPointerDown(event) {

    console.log("svg.onPointerDown called", event)

    if (event.button === LEFT_BUTTON) { // left

        let stop = false
        let p = api.tool.getSvgCoords(event)
        resolvePoint([p, stop])
    }
}
// Pointer UP
//
function onPointerUp(event) {
    console.log("svg.onPointerUp called", event)

    if (event.button === RIGHT_BUTTON) { // right
        let stop = true
        resolvePoint([{ x: 0, y: 0 }, stop])
        return
    }


}

function onContextMenu(event) {
    event.preventDefault()
    resolvePoint([{ x: 0, y: 0 }, true])
}

// Pointer MOVE
//
function onPointerMove(event) {

    //console.log("svg.onPointerMove called", event, circle.id)

    if (circle) {
        let p = api.tool.getSvgCoords(event)
        circle.setAttribute("cx", p.x)
        circle.setAttribute("cy", p.y)
        //console.log("svg.onPointerMove called", p)
    }

}

// Document KEYUP
//
function onDocumentKeyUp(event) {

    console.log("document.onKeyUp called", event, event.key)

    if (event.key === 'Escape') {
        let stop = true
        resolvePoint([{ x: -1, y: -1 }, stop])
        return
    }

}

function getPoint(message) {
    return new Promise(resolve => {
        resolvePoint = resolve
    })
}

async function runUntilStop(resolveStop) {

    while (true) {

        let [point, stop] = await getPoint("next point")

        if (stop) {
            console.log("Stop:", stop)
            resolveStop()
            break
        }

        if (polyline === undefined) {
            polyline = api.create.polyline()
            polyline.points = ""
            const layer = api.layer.getCurrent()
            api.selection.select(polyline, layer)
        }

        points.push(point)

        let editorStore = useEditorStore()

        if ('points' in editorStore.editingAttributes) {
            editorStore.editingAttributes.points = points.map(p => `${p.x},${p.y}`).join(' ')
        }

        console.log("points", polyline.points)


    }
}


function initialize_() {
    console.log("initialize tool")

    // TODO: Put on special layer with z-index: +2147483647
    // see https://www.digitalocean.com/community/tutorials/css-z-index#
    //
    let radius = 4
    circle = api.tool.createCircle(radius)
    api.tool.show(circle)
    console.log("initialize circle", circle)

    // Cursor

    document.getElementById('svg')
    savedCursor = svg.style.cursor
    svg.style.cursor = 'crosshair'
}

function cleanUp_() {
    api.tool.hide(circle)
    svg.style.cursor = savedCursor
}

async function start() {
    initialize_()
    const runUntilPromise = new Promise(runUntilStop)
    return runUntilPromise
}

function stop() {
    cleanUp_()
}

// Tool
//
const tool = {
    name: 'polyline',
    handlers: [
        { elementId: 'svg', name: 'pointerup', func: onPointerUp },
        { elementId: 'svg', name: 'pointerdown', func: onPointerDown },
        { elementId: 'svg', name: 'pointermove', func: onPointerMove },
        { elementId: 'svg', name: 'contextmenu', func: onContextMenu },
        { element: document, name: 'keyup', func: onDocumentKeyUp }
    ],
    start,
    stop
}

export default tool