// PolyLineTool.js

// Each tool has handlers that where add to the element
// when the tool is activated and removed when the tool
// is deactivated.

// Imports
//
import api from 'api/internal'

import { argFns } from 'services/utils'
import { addPoints } from 'services/utils'

import { useStore } from 'stores/store'
import { useEditorStore } from 'stores/editor'

// Local variables
//
let resolvePoint = null
let circle = null
let text = null
let savedCursor = null
let polyline = undefined
let points = []
let str = ""
let allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', ',', '.', '@']

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

        let store = useStore()
        store.lastPoint = p
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

// Context MENU
//
function onContextMenu(event) {
    event.preventDefault()
    resolvePoint([{ x: 0, y: 0 }, true])
}

// Pointer MOVE
//
function onPointerMove(event) {

    //console.log("svg.onPointerMove called", event, circle.id)

    let p = api.tool.getSvgCoords(event)

    if (circle) {

        circle.setAttribute("cx", p.x)
        circle.setAttribute("cy", p.y)
    }

    if (text) {
        text.setAttribute("x", p.x)
        text.setAttribute("y", p.y)
    }

}

// Document KEYDOWN
//
function onDocumentKeyDown(event) {

    //event.preventDefault()

    if (event.key === 'Enter') {
        let stop = false

        let args = [str]
        let [p, relative] = argFns.asPoint2(args, 0)

        console.log("p:", p)

        let store = useStore()

        if (relative && store.lastPoint !== undefined) {
            p = addPoints(store.lastPoint, p)
        }

        resolvePoint([p, stop])
        str = ""
        text.textContent = str
        store.lastPoint = p

        return
    }

    if (event.key == 'Backspace') {
        str = str.slice(0, -1)
        text.textContent = str
    }

    if (event.key === 'Escape') {
        let stop = true
        resolvePoint([{ x: -1, y: -1 }, stop])
        return
    }

    if (allowedChars.includes(event.key)) {
        str += event.key
    } else {
        //console.log(event.key, "==", event.key === ',')
    }

    if (text) {
        if (str.length > 0) {
            api.tool.show(text)
        }
        text.textContent = str
    }

    //console.log("document.onKeyUp called", event, event.key)

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
            let attrs = {
                'points': []
            }
            polyline = api.scene.createElement('polyline', attrs)
            api.selection.select(polyline)
        }

        points.push(point)

        let editorStore = useEditorStore()

        if ('points' in editorStore.editingAttributes) {
            editorStore.editingAttributes.points = points.map(p => `${p.x},${p.y}`).join(' ')
        }

        //console.log("points", polyline.points)
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

    // Text
    text = api.tool.createText()
    api.tool.show(text)

    // Cursor

    document.getElementById('svg')
    savedCursor = svg.style.cursor
    svg.style.cursor = 'crosshair'
}

function cleanUp_() {
    api.tool.hide(circle)
    svg.style.cursor = savedCursor

    polyline = undefined
    points = []
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
        { element: document, name: 'keydown', func: onDocumentKeyDown }
    ],
    start,
    stop
}

export default tool