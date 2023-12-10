// Zoom.js

// see https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Pinch_zoom_gestures

// Imports
//
import api from 'api/api'

// Data
//
const self = {
    savedCursor: undefined,
    startZooming: false,
    lastScale: 1.0
}


// Handler functions
//
function onGestureStart(event) {
    event.preventDefault()
    //event.stopPropagation()
    //event.stopImmediatePropagation()
    //
    self.lastScale = api.view.getZoomFactor()
    console.log("Zoom - onGestureStart lastScale", self.lastScale)
}

function round2(x) {
    let y = Math.log2(x)
    let z = Math.round(y)
    return Math.pow(2, z)
}


function getDiscretScale(event) {

    if (event.scale < 1.0) {
        let scale = self.lastScale * event.scale
        return 1.0 / round2(1.0 / scale)
    }
    let scale = self.lastScale * event.scale
    return round2(scale)
}

function getNormalScale(event) {
    if (event.scale < 1.0) {
        let scale = self.lastScale * event.scale
        console.log("Zoom - getNormalScale scale", scale)
        return scale
    }
    let scale = self.lastScale * event.scale
    console.log("Zoom - getNormalScale scale", scale)
    return scale
}

function onGestureChange(event) {
    event.preventDefault()
    //event.stopPropagation()
    //event.stopImmediatePropagation()
    //
    // let p = api.tool.getSvgCoords(event)

    let currentScale = getNormalScale(event)
    api.view.zoom(currentScale)

    /*
    let currentScale = getDiscretScale(event)
    console.log("Zoom - onGestureChange currentScale:", event.scale)
    if (currentScale !== self.lastScale) {
        api.view.zoom(currentScale)
        self.lastScale = currentScale
    }
    */
}

function onGestureEnd(event) {
    event.preventDefault()
    //event.stopPropagation()
    //event.stopImmediatePropagation()
    //

    let currentScale = getDiscretScale(event)
    api.view.zoom(currentScale)

    console.log("Zoom - onGestureEnd", getDiscretScale(event))
    //resolveStop()
}

// Start
//
let resolveStop = undefined

async function start() {

    self.savedCursor = svg.style.cursor
    svg.style.cursor = 'pointer'

    console.log("zoomTool - started")

    return new Promise(resolve => {
        resolveStop = resolve
    })
}

function onKeyDown(event) {
    if (event.key === 'Escape') {
        resolveStop()
    }
}

// Stop
//
function stop() {
    svg.style.cursor = self.savedCursor
}

// Tool
//
const tool = {
    name: 'zoom',
    handlers: [
        { elementId: 'svg', name: 'gesturestart', func: onGestureStart },
        { elementId: 'svg', name: 'gesturechange', func: onGestureChange },
        { elementId: 'svg', name: 'gestureend', func: onGestureEnd },
        { element: document, name: 'keydown', func: onKeyDown },
    ],
    start,
    stop
}

/*
window.addEventListener('gesturestart', e => e.preventDefault());
window.addEventListener('gesturechange', e => e.preventDefault());
window.addEventListener('gestureend', e => e.preventDefault());
*/

export default tool