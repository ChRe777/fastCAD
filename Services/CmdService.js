// COMMANDS.js
//

// Imports
//
import api from 'api/api'

import { argFns } from 'services/utils'
import { useStore } from 'stores/store'
import { useCmdStore } from 'stores/cmd'

// Commands
//

// clear
//
function doCmdClear() {

    // Reset scene
    //
    api.scene.create()
    //
    // Create a default layer
    //
    const name = 'layer0'
    const description = 'Default layer 0'

    const newLayer = api.layer.create(name, description)
    api.scene.addLayer(newLayer)
}

// save
//
function doCmdSave(args) {
    let name = argFns.asString(args, 1)
    api.scene.save(name)
}

// load
//
function doCmdLoad(args) {
    let name = argFns.asString(args, 1)
    api.scene.load(name)
}

// move @10,0 or move 10,10
//
function doCmdMove(args) {
    const [p, relative] = argFns.asPoint2(args, 1)

    api.selection.forEach(selectedElement => {
        api.modify.move.move(selectedElement, p, relative)
    })

}

// rotate 45° 10,0 
//
function doCmdRotate(args) {
    const angle = argFns.asFloat(args, 1)
    const [p, relative] = argFns.asPoint2(args, 2) || [{ x: 0, y: 0 }, true]

    api.selection.forEach(selectedElement => {
        api.modify.rotate.rotate(selectedElement, angle, p, relative)
    })
}

// rotate 45° 10,0 // TODO: deg -> rad
//
function doCmdRotate(args) {
    const angle = argFns.asFloat(args, 1)
    const [p, relative] = argFns.asPoint2(args, 2) || [{ x: 0, y: 0 }, true]

    api.selection.forEach(selectedElement => {
        api.modify.rotate.rotate(selectedElement, angle, p, relative)
    })
}

// group selected together
//
function doCmdGroup(args) {
    api.create.group(Array.from(api.selection.elements()))
}



// zoom in 
// zoom out
//
async function doCmdZoom(args) {

    if (args.length == 1) {

        // Connect mouse and keyboard to the tool
        //
        let tool = api.tool.activate("zoom")
        await tool.start()
        api.tool.deactivate(tool)

        return
    }

    if (argFns.asString(args, 1) == 'out') {
        doCmdZoomOut()
    }
    if (argFns.asString(args, 1) == 'in') {
        doCmdZoomIn()
    }
}

// zoom in
//
function doCmdZoomIn(args) {
    api.view.zoomIn()
}

// zoom out
//
function doCmdZoomOut(args) {
    api.view.zoomOut()
}

// Panning
//
async function doCmdPan(args) {

    if (args.length == 1) { // e.g. pan

        // Connect mouse and keyboard to the tool
        //
        let tool = api.tool.activate("pan")
        await tool.start()
        api.tool.deactivate(tool)

        return
    }

    const [p, _] = argFns.asPoint2(args, 1)
    api.view.pan(p.x, p.y)
}

// line 10,10 20,20
// line @10,10 20,20
// line @10,10 @20,20
// line 10,10 @20,20
//
function doCmdLine(args) {

    let [p1, relative1] = argFns.asPoint2(args, 1) || [{ x: -50, y: -50 }, false]
    let [p2, relative2] = argFns.asPoint2(args, 2) || [{ x: 50, y: 50 }, false]

    api.create.line(p1, relative1, p2, relative2)
}

// lineTo 100,100
// lineTo @200,200
//
function doCmdLineTo(args) {

    let [p2, relative2] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]

    api.create.lineTo(p2, relative2)
}

// circle 10,10 50
//
function doCmdCircle(args) {

    let [p, relative] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let r = argFns.asFloat(args, 2) || 50

    api.create.circle(p, relative, r)
}

// circle 10,10 50 50
//
function doCmdEllipse(args) {

    let [p, relative] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let rx = argFns.asFloat(args, 2) || 50
    let ry = argFns.asFloat(args, 2) || 30

    api.create.ellipse(p, relative, rx, ry)
}

// text 10,10 "text"
//
function doCmdText(args) {

    // Multiline
    // see https://stackoverflow.com/questions/31469134/how-to-display-multiple-lines-of-text-in-svg

    let [p, relative] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let text = argFns.asString(args, 2) || "text"

    api.create.text(p, relative, text)
}


// Path
//
function doCmdPath(args) {

    // path 0,0 h 10 v 10
    let d = "M 0 0 h 100 v 100"
    if (args.length > 2)
        d = args.slice(1).join(" ")
    api.create.path(d)
}

async function doCmdPolyline(args) {

    if (args.length == 1) { // e.g. pl

        // Connect mouse and keyboard to the tool
        //
        let polyLineTool = api.tool.activate("polyline")
        await polyLineTool.start()
        api.tool.deactivate(polyLineTool)
        return
    }

    // TODO: polyline "0,0 0,10 10,10 10,0"
    //let [p, relative] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    //let text = argFns.asString(args, 2) || "text"

    api.create.polyline()
}

function doCmdPolygon(args) {

    // TODO: polygon "0,0 0,10 10,10 10,0 "
    //let [p, relative] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    //let text = argFns.asString(args, 2) || "text"

    api.create.polygon()
}

function doCmdImage(args) {

    // image 0,0 100,100 http://images.com/img.png
    //
    let [p, _] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let [size, __] = argFns.asPoint2(args, 2) || [{ x: 100, y: 100 }, false]
    let href = argFns.asString(args, 3) || "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-1024.png"

    api.create.image(p, size, href)
}

function doCmdRect(args) {

    // rect 0,0 100,100
    //
    let [p, _] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let [size, __] = argFns.asPoint2(args, 2) || [{ x: 100, y: 100 }, false]

    api.create.rect(p, size)
}

// layer
//
function doCmdLayer(args) {

    let name = argFns.asString(args, 1) || "newLayer"
    let description = argFns.asString(args, 2) || "newLayer"

    api.layer.create(name, description)
}

// delete
//
function doCmdDelete(args) {
    api.destroy.selected()
}


// select
//
async function doCmdSelect(args) {

    if (args.length == 1) { // e.g. pl

        // Connect mouse and keyboard to the tool
        //
        let tool = api.tool.activate("selection")
        await tool.start()
        api.tool.deactivate(tool)
        return
    }

}

// deselect
//
function doCmdDeselect(args) {
    api.selection.clear()
}

// batch
//
function doCmdBatch(args) {
    // GUI
    const store = useStore()
    store.showBatch = !store.showBatch
}

// export
//
function doCmdExport(args) {
    // GUI
    const store = useStore()
    store.showExport = !store.showExport
}

// settings
//
function doCmdSettings(args) {
    // GUI
    const store = useStore()
    store.showSettings = !store.showSettings
}

// set cx 0 cy 0
// set layer foo
//
function doCmdSet(args) {

    let attrName = argFns.asString(args, 1)
    let attrValue = argFns.asString(args, 2)

    // set layer layerXYZ
    //
    if (attrName === 'layer') {
        let layerName = attrValue
        api.selection.forEach(selectedElement => {
            api.modify.layer.set(selectedElement, layerName)
        })
    }

    // set cy 0
    // set fill #ff00ff
    //
    api.selection.forEach(selectedElement => {
        let attrs = {};
        attrs[attrName] = attrValue
        api.modify.modify(selectedElement, selectedElement.type, attrs)
    })
}

// copy
//
function doCmdCopy(args) {

    let [p, relative] = argFns.asPoint2(args, 1) || [{ x: 10, y: 10 }, true]

    // No args copy the selected
    if (args.slice(1).length === 0) {

        const copiedElements = []
        api.selection.forEach(selectedElement => {
            const element = api.create.copy(selectedElement)
            copiedElements.push(copiedElements)
            api.modify.move.move(element, p, relative)
        })

        // TODO: Select all or last
        //api.selection.clear()

    }

}

// mirror y 300 {copy}
//
function doCmdMirror(args) {

    let axis = argFns.asString(args, 1)
    let value = argFns.asFloat(args, 2)
    let copy = argFns.asString(args, 3) || false

    function mirrorSelected(axis, value, copy) {

        api.selection.forEach(selectedElement => {
            if (copy) {
                newElement = api.create.copy(selectedElement)
                api.modify.mirror.mirror(newElement, type, axis, value)
            } else {
                api.modify.mirror.mirror(selectedElement, type, axis, value)
            }
        })

    }

    mirrorSelected(axis, value, copy)
}

// message "Hello World" // TODO:
//
function doCmdMessage(args) {
    let text = argFns.asString(args, 1)
    api.create.Message(text)
}

function doCmdSnow(args) {
    let on_off = argFns.asString(args, 1)

    const store = useStore()

    if (on_off === 'on') {
        store.showFun = true
    }

    if (on_off === 'off') {
        store.showFun = false
    }

}

/*
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
    doCmdPan,
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
    doCmdSelect,
    doCmdDeselect,
    //
    doCmdBatch,
    doCmdSettings,
}

// Export Cmds
//
export default cmds
*/
// Init Command Store
//

// Imports
//
const { randomUUID } = new ShortUniqueId({ length: 10 });


// Init 
//
export function init() {

    const cmdStore = useCmdStore()

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
        name: 'delete',
        suggestion: 'delete',
        shortCuts: ['backspace'],
        hotKeys: undefined,
        action: doCmdDelete,
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
        suggestion: 'circle {p} {r}',
        shortCuts: [],
        hotKeys: 'ci',
        action: doCmdCircle,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'ellipse',
        suggestion: 'ellipse {p} {rx} {rx}',
        shortCuts: [],
        hotKeys: 'el',
        action: doCmdEllipse,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'image',
        suggestion: 'image {p} {size} {href}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdImage,
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
        name: 'path',
        suggestion: 'path {string}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdPath,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'polyline',
        suggestion: 'polyline {string}',
        shortCuts: [],
        hotKeys: 'pl',
        action: doCmdPolyline,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'polygon',
        suggestion: 'polygon {string}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdPolygon,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'rect',
        suggestion: 'rect {x,y} {w,h}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdRect,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'group',
        suggestion: 'group',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdGroup,
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
        name: 'rotate',
        suggestion: 'rotate {angle} {{p}}',
        shortCuts: [],
        hotKeys: 'r',
        action: doCmdRotate,
    })

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'select',
        suggestion: 'select',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdSelect,
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
        name: 'pan',
        suggestion: 'pan {x,y}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdPan,
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
        name: 'export',
        suggestion: 'export',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdExport,
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

    cmdStore.registerCmd({
        uuid: randomUUID(),
        name: 'snow',
        suggestion: 'snow {on|off}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdSnow
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


