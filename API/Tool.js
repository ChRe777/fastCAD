// Tools.js

//                              connected
// [ SCENE ] <--- [ ACTIVE TOOL ] <--- [ USER (Pointer/Keyboard/...)

// Imports
//
import { useToolStore } from 'stores/tool'

// Constants
//
const { randomUUID } = new ShortUniqueId({ length: 10 })
const TOOL_LAYER = 'toolLayer'
const SELECTION_LAYER = 'selectionLayer'

// Objects
//
let circle = null
let rect = null

// Activate a tool
//
function activate(name) {

    const toolStore = useToolStore()

    // Connect events from keyboard
    // Connect events from mouse

    const tool = toolStore.registeredToolsByName[name]
    if (tool === undefined) {
        console.error(`Tool with name ${name} not found`)
        return undefined
    }

    // Register handler like for example:
    //
    //  * svg.addEventListener('pointerup', tool.onPointerUp)
    //  * inputField.addEventListener('keyup', tool.onPointerUp)
    //
    console.log(`tool ${name} register handlers!`)

    tool.handlers.forEach(handler => {
        if (handler.element) {
            const element = handler.element
            element.addEventListener(handler.name, handler.func)
        } else {
            const element = document.getElementById(handler.elementId)
            element.addEventListener(handler.name, handler.func)
        }
    })

    console.log(`tool ${name} successful activated!`)

    return tool
}

// Deactivate a tool
//
function deactivate(tool) {
    // Remove connections
    //
    tool.handlers.forEach(handler => {
        if (handler.element) {
            const element = handler.element
            element.removeEventListener(handler.name, handler.func)
        } else {
            const element = document.getElementById(handler.elementId)
            element.removeEventListener(handler.name, handler.func)
        }
    })

    console.log(`tool ${tool.name} stopping!`)
    tool.stop()
    console.log(`tool ${tool.name} successful deactivated!`)
}

// Get current Pointer coordinates in SVG Element
//
function getSvgCoords(event) {
    const svg = document.getElementById('svg')
    const CTM = svg.getScreenCTM()
    const point = {
        x: (event.clientX - CTM.e) / CTM.a,
        y: (event.clientY - CTM.f) / CTM.d
    }
    return point
}

// TODO:  Pointer position circle

function createCircle(r) {
    if (circle === null) {
        let obj = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

        obj.setAttribute('stroke', 'black')
        obj.setAttribute('stroke-width', '1')
        obj.setAttribute('fill', '#ff0000')
        //
        obj.setAttribute('cx', '0')
        obj.setAttribute('cy', '0')
        obj.setAttribute('r', r)

        obj.setAttribute('visibility', 'hidden')

        let type = 'Point'
        obj.setAttribute('id', type + '-' + randomUUID())

        let toolLayer = document.getElementById(TOOL_LAYER)
        toolLayer.appendChild(obj)

        circle = obj
    }
    return circle
}

// TODO: 
function createRectangle(r) {
    if (circle === null) {
        let obj = document.createElementNS('http://www.w3.org/2000/svg', 'rect')

        obj.setAttribute('stroke', '#ffffff')
        obj.setAttribute('stroke-width', '1')
        obj.setAttribute('stroke-dasharray', '3')
        obj.setAttribute('fill', 'none')
        //
        obj.setAttribute('x', 0)
        obj.setAttribute('y', 0)
        obj.setAttribute('width', 0)
        obj.setAttribute('height', 0)

        obj.setAttribute('visibility', 'hidden')

        let type = 'SelectionRect'
        obj.setAttribute('id', type + '-' + randomUUID())

        let toolLayer = document.getElementById(SELECTION_LAYER)
        toolLayer.appendChild(obj)

        rect = obj
    }
    return rect
}

function hide(obj) {
    obj.setAttribute('visibility', 'hidden')
}

function show(obj) {
    obj.setAttribute('visibility', 'visible')
}

// Exports
//
export default {
    activate,
    deactivate,
    getSvgCoords,
    createCircle,
    createRectangle,
    hide,
    show
}