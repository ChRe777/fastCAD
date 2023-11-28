// COMMANDS.js
//

// Imports
//
import io from 'services/io'
import api from 'services/api'

import { defaults } from 'services/defaults'
import { argFns, addPoints, subPoints } from 'services/utils'

import { useStore } from 'stores/store'
import { useCmdStore } from 'stores/cmd'
import { useViewStore } from 'stores/view'
import { useEditorStore } from 'stores/editor'
import { useMessageStore } from 'stores/message'
import { useSelectionStore } from 'stores/selection'

// Commands
//

// clear
//
function doCmdClear() {

    // Reset scene
    //
    const store = useStore()
    store.scene.layers = []

    // Reset selection
    //
    const selectionStore = useSelectionStore()
    selectionStore.selectedElements = []
    selectionStore.selectedLayers = []

    // Reset attribute editor
    //
    const editorStore = useEditorStore()
    editorStore.editingAttributes = {}
    editorStore.layerEditingAttributes = {}

    // Create a default layer
    //
    const layer = api.create("layer", {
        'name': 'layer0',
        'description': 'This default layer 0',
        ...defaults.layer,
    })

    // .. and select it
    //
    api.select(layer, 'layer')
}

// save
//
function doCmdSave(args) {
    let name = undefined
    if (args.length > 1) {
        name = args[1]
    }

    const store = useStore()
    const messagesStore = useMessageStore()

    const successFn = function (data, name) {
        messagesStore.messages.push(`Saved ${name}`)
    }

    io.save(store.scene, name, successFn)
}

// load
//
function doCmdLoad(args) {

    let name = undefined
    if (args != undefined && args.length > 1) {
        name = args[1]
    }

    let onLoaded = function (scene, name) {
        const store = useStore()
        const selectionStore = useSelectionStore()

        store.scene = scene
        // TODO: ??
        if (store.scene.layers && store.scene.layers.length > 0) {
            selectionStore.selectedLayers[0] = store.scene.layers[0]
        }

        const messagesStore = useMessageStore()
        messagesStore.messages.push(`Loaded ${name}`)
    }

    io.load(onLoaded, name)
}

function moveGeneric1(d, attrs /*axis*/, relative, selectedElement) {
    attrs.forEach(attr => { // e.g. cx, cy or x1, x2
        if (relative) {
            // cx = "30" -> 30
            selectedElement[attr] = parseFloat(selectedElement[attr]) + d
        } else {
            selectedElement[attr] = d
        }
    })
}

function moveGeneric2(p, xs, ys, relative, selectedElement) {
    moveGeneric1(p.x, xs, relative, selectedElement)
    moveGeneric1(p.y, ys, relative, selectedElement)
}


// 10,0 -> 50,0
//

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

// points = "0,0 100,0 0,100 ...."
//
function movePointsXY(p, attr, relative, selectedElement) {
    let xys = selectedElement[attr].split(" ")

    if (!relative) {
        let p1 = toPoint(xys[0])
        p = subPoints(p, p1)
    }

    let zs = xys
        .map(toPoint)
        .map((x) => addPoints(p, x))
        .map(toXY)

    selectedElement[attr] = zs.join(" ")
}


// move @10,0 or move 10,10
//
function doCmdMove(args) {

    const store = useStore()
    if (store.selectedElements.length === 0) {
        return
    }

    const [p, relative] = argFns.asPoint2(args, 1)

    store.selectedElements.forEach(selectedElement => {
        if (selectedElement.type === 'circle') {
            moveGeneric2(p, ['cx'], ['cy'], relative, selectedElement)
        }
        else if (selectedElement.type === 'line') {
            moveGeneric2(p, ['x1', 'x2'], ['y1', 'y2'], relative, selectedElement)
        }
        else if (selectedElement.type === 'image') {
            moveGeneric2(p, ['x'], ['y'], relative, selectedElement)
        }
        else if (selectedElement.type === 'text') {
            moveGeneric2(p, ['x'], ['y'], relative, selectedElement)
        }
        else if (selectedElement.type === 'polyline') {
            movePointsXY(p, 'points', relative, selectedElement)
        }
        else if (selectedElement.type === 'polygon') {
            movePointsXY(p, 'points', relative, selectedElement)
        }
        else if (selectedElement.type === 'path') {
            // TODO: M 0 0 m 30 30
        }
    })

}

// zoom in 
// zoom out
//
function doCmdZoom(args) {

    if (argFns.asString(args, 1) == 'out') {
        doCmdZoomOut()
    }
    if (argFns.asString(args, 1) == 'in') {
        doCmdZoomIn()
    }
}

// zoom in
//
function doCmdZoomIn() {

    const viewStore = useViewStore()
    let step = Math.log2(viewStore.zoomFactor)
    // -19 .. 19
    if (-19 <= step && step < 19) {
        viewStore.zoomFactor *= 2;
    }
}

function doCmdZoomOut() {

    const viewStore = useViewStore()
    let step = Math.log2(viewStore.zoomFactor)
    // -19 .. 19
    if (-19 < step && step <= 19) {
        viewStore.zoomFactor /= 2;
    }
}

// line 10,10 20,20
// line @10,10 20,20
// line @10,10 @20,20
// line 10,10 @20,20
//
function doCmdLine(args) {

    const store = useStore()

    let [p1, relative1] = argFns.asPoint2(args, 1) || [{ x: -50, y: -50 }, false]
    let [p2, relative2] = argFns.asPoint2(args, 2) || [{ x: 50, y: 50 }, false]

    if (relative1) {
        p1 = addPoints(store.lastPoint, p1)
    }

    if (relative2) {
        p2 = addPoints(p1, p2)
    }

    api.create('line', {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    store.lastPoint = p2
}

// lineTo 100,100
// lineTo @200,200
//
function doCmdLineTo(args) {

    const store = useStore()

    let p1 = [{ x: 0, y: 0 }, false]
    let [p2, relative2] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]

    if (store.lastPoint !== undefined) {
        p1 = store.lastPoint
    }

    if (relative2) {
        p2 = addPoints(p1, p2)
    }

    api.create('line', {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    store.lastPoint = p2
}

// circle 10,10 50
//
function doCmdCircle(args) {

    const store = useStore()

    let [p, relative] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let r = argFns.asFloat(args, 2) || 50

    if (relative && store.lastPoint !== undefined) {
        p = addPoints(store.lastPoint, p)
    }

    api.create('circle', {
        cx: p.x,
        cy: p.y,
        r: r,
        fill: defaults.style.fill,
        stroke: defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    store.lastPoint = p

}

// text 10,10 "text"
//
function doCmdText(args) {

    const store = useStore()

    let [p, relative] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let text = argFns.asString(args, 2) || "text"

    if (relative && store.lastPoint !== undefined) {
        p = addPoints(store.lastPoint, p)
    }

    api.create('text', {
        x: p.x,
        y: p.y,
        text: text,
        "font-family": defaults.font.family,
        "font-size": defaults.font.size,
        fill: defaults.style.fill,
        stroke: defaults.style.stroke,
        'stroke-width': 0 //defaults.style['stroke-width']
    })

    store.lastPoint = p

}

// layer
//
function doCmdLayer(args) {

    let name = argFns.asString(args, 1)
    let description = argFns.asString(args, 2)

    api.create("layer", {
        'name': name,
        'description': description,
        ...defaults.layer
    })

}

// delete
//
function doCmdDelete(args) {

    const store = useSelectionStore()

    // Remove from layers
    //
    store.selectedElements.forEach(selectedElement => {
        api.destroy(selectedElement)
    })

    // Remove from selection
    //
    store.selectedElements = []
}

// deselect
//
function doCmdDeselect(args) {
    console.log("doCmdDeselect")
    const selectionStore = useSelectionStore()
    selectionStore.selectedElements = []
}

// batch
//
function doCmdBatch(args) {
    const store = useStore()
    store.showBatch = !store.showBatch
}

// settings
//
function doCmdSettings(args) {
    const store = useStore()
    store.showSettings = !store.showSettings
}

// set cx 0 cy 0
// set layer foo
//
function doCmdSet(args) {
    const store = useStore()
    const selectionStore = useSelectionStore()

    let prop = argFns.asString(args, 1)
    let value = argFns.asString(args, 2)

    if (prop === 'layer') {
        let name = value
        return setLayer_(name)
    }

    selectionStore.selectedElements.forEach(selectedElement => {
        let attrs = {};
        attrs[prop] = value
        api.modify(selectedElement, selectedElement.type, attrs)
    })

    if (store.lastCreatedElement !== undefined) {
        let attrs = {};
        attrs[prop] = value
        api.modify(store.lastCreatedElement, store.lastCreatedElement.type, attrs)
    }
}

function setLayer_(name) {
    const store = useStore()
    const selectionStore = useSelectionStore()

    let newLayer = store.scene.layers.find((layer) => layer.name === name);
    if (newLayer === undefined) {
        // TODO: Info wrong layer name
        return
    }

    console.log("setLayer", name)
    selectionStore.selectedElements.forEach(selectedElement => {
        // Remove from old layer
        console.log("setLayer", "remove")
        for (let oldLayer of store.scene.layers) {
            oldLayer.elements = oldLayer.elements.filter(obj => obj.id !== selectedElement.id)
        }

        console.log("setLayer", "add")
        // Add to new layer
        newLayer.elements.push(selectedElement)
    })
}

// copy
//
function doCmdCopy(args) {
    const store = useStore()

    store.selectedElements.forEach(selectedElement => {
        let { id, type, ...attrs } = selectedElement
        api.create(type, attrs)
    })
}

// mirror y 300
//
function doCmdMirror(args) {
    const store = useStore()

    let axis = argFns.asString(args, 1)
    let value = argFns.asFloat(args, 2)

    store.selectedElements.forEach(selectedElement => {
        let { id, type, ...attrs } = selectedElement
        let obj = api.create(type, attrs)
        api.mirror(obj, type, axis, value)
    })
}

// message "Hello World"
//
function doCmdMessage(args) {
    const messageStore = useMessageStore()
    let text = argFns.asString(args, 1)
    messageStore.messages.push(text)
}

const cmds = {
    doCmdClear,
    doCmdSave,
    doCmdLoad,
    //
    doCmdMove,
    doCmdSet,
    doCmdCopy,
    doCmdMirror,
    //
    doCmdZoom,
    doCmdZoomIn,
    doCmdZoomOut,
    //
    doCmdCircle,
    doCmdLine,
    doCmdLineTo,
    doCmdText,
    doCmdMessage,
    //
    doCmdLayer,
    //
    doCmdDelete,
    doCmdDeselect,
    //
    doCmdBatch,
    doCmdSettings,
}

// Export Cmds
//
export default cmds

// Init Command Store
//

// Imports
//
const { randomUUID } = new ShortUniqueId({ length: 10 });


// Init 
//
export function init() {

    let cmdStore = useCmdStore()

    // Register Commands
    //

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'load',
        suggestion: 'load',
        shortCuts: ['option+l'],
        action: doCmdLoad,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'save',
        suggestion: 'save',
        shortCuts: ['ctrl+s'], // ??
        action: doCmdSave,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'clear',
        suggestion: 'clear',
        shortCuts: ['ctrl+d'], // ??
        action: doCmdClear,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'line',
        suggestion: 'line {p1} {p2}',
        shortCuts: [],
        hotKeys: 'l',
        action: doCmdLine,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'lineTo',
        suggestion: 'lineTo {p1}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdLineTo,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'circle',
        suggestion: 'circle {p1} {r}',
        shortCuts: [],
        hotKeys: 'ci',
        action: doCmdCircle,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'text',
        suggestion: 'text {p} {string}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdText,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'layer',
        suggestion: 'layer {name} {description}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdLayer,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'move',
        suggestion: 'move {p}',
        shortCuts: [],
        hotKeys: 'm',
        action: doCmdMove,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'delete',
        suggestion: 'delete',
        shortCuts: ['backspace'],
        hotKeys: undefined,
        action: doCmdDelete,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'deselect',
        suggestion: 'deselect',
        shortCuts: ['esc'],
        hotKeys: undefined,
        action: doCmdDeselect,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'zoom',
        suggestion: 'zoom {in/out}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdZoom,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'batch',
        suggestion: 'batch',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdBatch,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'settings',
        suggestion: 'settings',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdSettings
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'set',
        suggestion: 'set {prop} {value} ...',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdSet
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'copy',
        suggestion: 'copy',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdCopy
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'mirror',
        suggestion: 'mirror',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdMirror
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'message',
        suggestion: 'message',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdMessage
    })

    // Register HotKeys
    //
    cmdStore.registeredCmds.forEach(cmd => {
        if (cmd.shortCuts.length > 0) {
            // console.log("register shortcuts:", cmd.shortCuts)
            //  e.g. ['ctrl+s'] -> calls 'cmdCmdSave()'
            //
            Mousetrap.bind(cmd.shortCuts, () => {
                cmd.action()
                // return false to prevent default browser behavior
                // and stop event from bubbling
                return false
            });
        }
    })
}


