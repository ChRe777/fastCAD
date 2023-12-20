// Pan.js

// Imports
//
import api from 'api/internal'

// Data
//
const self = {
    isDragging: false,
    startX: 0,
    startY: 0,
    savedCursor: undefined
}


// Handler functions
//
function onPointerDown(event) {
    self.isDragging = true
    let current = api.tool.getSvgCoords(event)
    self.startX = current.x
    self.startY = current.y
    svg.style.cursor = 'grabbing'
}

function onPointerUp(event) {
    self.isDragging = false
    svg.style.cursor = self.savedCursor
    resolveStop()
}

function onPointerMove(event) {
    if (self.isDragging) {

        let current = api.tool.getSvgCoords(event)
        let deltaX = current.x - self.startX
        let deltaY = current.y - self.startY
        api.view.pan(deltaX, deltaY)
    }
}

// Start
//
let resolveStop = undefined

async function start() {
    console.log("start panning")

    self.savedCursor = svg.style.cursor
    svg.style.cursor = 'grab'

    return new Promise(resolve => {
        resolveStop = resolve
    })
}

// Stop
//
function stop() {
    console.log("stop panning")
}

// Tool
//
const tool = {
    name: 'pan',
    handlers: [
        { elementId: 'svg', name: 'pointerdown', func: onPointerDown },
        { elementId: 'svg', name: 'pointerup', func: onPointerUp },
        { elementId: 'svg', name: 'pointermove', func: onPointerMove },
    ],
    start,
    stop
}

export default tool