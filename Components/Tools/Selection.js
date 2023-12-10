// Selection.js


// Imports
//
import api from 'api/api'
import { inside, intersect } from './SelectionUtils.js'


// Local self
//
const self = {
    svg: undefined,
    // Mode
    //
    isDragging: false,
    // Start Drag
    //
    startX: 0,
    startY: 0,
    // Rectangle
    //
    selectionRectangle: undefined,
    //
    x: 0,
    y: 0,
    height: 0,
    width: 0,
}

let resolveStop = null

// Functions
//
function resetRectangle() {
    self.x = 0
    self.y = 0
    self.height = 0
    self.width = 0
    setRectangle()
}

function setRectangle() {
    self.selectionRectangle.setAttribute('x', self.x)
    self.selectionRectangle.setAttribute('y', self.y)
    self.selectionRectangle.setAttribute('width', self.width)
    self.selectionRectangle.setAttribute('height', self.height)
}


function resetAll() {
    self.isDragging = false
    self.startX = 0
    self.startY = 0
    resetRectangle()
}

function trySelectElements(elements, layer, crossMode) {

    const selectionBB = self.selectionRectangle.getBoundingClientRect()

    elements.forEach((element) => {

        const element_ = svg.getElementById(element.id)
        const elementBB = element_.getBoundingClientRect()

        if (element.type != 'layer') {

            let fn = crossMode ? intersect : inside
            let insideOrIntersect = fn(elementBB, selectionBB)
            if (insideOrIntersect) {
                api.selection.select(element, layer)
            }

        }
    })
}

// TODO: Make selection recusive
//
// layer 1
//   - element 1.1
//   - element 1.2
//   - layer 1.1
//       - element 1.1.1
//       - element 1.1.2

function trySelect(layer, crossMode) {

    // If you not cross or have inside the layer
    // then you don't need to go over elements
    //
    const layerElement = svg.getElementById(layer.id)
    const layerBB = layerElement.getBoundingClientRect()
    const selectionBB = self.selectionRectangle.getBoundingClientRect()

    let fn = crossMode ? intersect : inside
    let insideOrIntersect = fn(layerBB, selectionBB)
    if (insideOrIntersect) {
        trySelectElements(layer.elements, layer, crossMode)
    }
}

// Pointer DOWN
// 
function onPointerDown(event) {

    if (self.isDragging) {
        resolveStop(true)
    }

    // Start Dragging
    //
    self.isDragging = true

    // Show selection rectangle
    //
    if (self.selectionRectangle == undefined) {
        self.selectionRectangle = api.tool.createRectangle()
    }

    api.tool.show(self.selectionRectangle)

    // Set start point of selection rect
    //
    const pointer = api.tool.getSvgCoords(event)

    self.startX = pointer.x
    self.startY = pointer.y

    resetRectangle()
}

// Pointer MOVE
//
function onPointerMove(event) {

    if (self.isDragging == false) {
        return
    }

    // Get current relative mouse position in svg scene
    //
    const pointer = api.tool.getSvgCoords(event)

    // Calc size of rect
    //
    const width = pointer.x - self.startX
    const height = pointer.y - self.startY

    // Check if crossMode (intersect objects)
    //
    let crossMode = width < 0 || height < 0

    // Set selection rectangle
    //
    self.x = Math.min(self.startX, pointer.x)
    self.y = Math.min(self.startY, pointer.y)
    self.width = Math.abs(width)
    self.height = Math.abs(height)

    // Set Rect
    //
    setRectangle()

    // SpeedUp - Bounding Box of g-(layer)-element
    //
    api.layer.forEach(layer => trySelect(layer, crossMode))

}

// Pointer UP
//
function onPointerUp() {
    //resolveStop()
}

// Init
//
function initialize() {
    if (self.svg === undefined) {
        self.svg = document.getElementById('svg')
    }
    self.savedCursor = svg.style.cursor
    svg.style.cursor = 'pointer'
}

function cleanUp() {

    // Hide selection rectangle
    //
    api.tool.hide(self.selectionRectangle)

    resetAll()

    svg.style.cursor = self.savedCursor
}

function getStop(message) {
    return new Promise(resolve => {
        resolveStop = resolve
    })
}

async function runUntilStop(resolve) {

    while (true) {

        let stop = await getStop()

        if (stop) {
            resolve()
            break
        }
    }
}

// Start
//
async function start() {
    initialize()
    return new Promise(runUntilStop)
}

// Stop
//
function stop() {
    cleanUp()
}

const tool = {
    name: 'selection',
    handlers: [
        { elementId: 'svg', name: 'pointerdown', func: onPointerDown },
        { elementId: 'svg', name: 'pointerup', func: onPointerUp },
        { elementId: 'svg', name: 'pointermove', func: onPointerMove },
    ],
    start,
    stop
}

// Export
//
export default tool