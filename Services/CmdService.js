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

    api.layer.create(name, description)
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
    api.view.zoomIn()
}

// zoom out
//
function doCmdZoomOut() {
    api.view.zoomOut()
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

// text 10,10 "text"
//
function doCmdText(args) {

    let [p, relative] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let text = argFns.asString(args, 2) || "text"

    api.create.text(p, relative, text)
}


// Path
//
function doCmdPath(args) {

    // path 0,0 h 10 v 10
    const d = args.slice(1).join(" ")
    api.create.path(d)
}

function doCmdPolyline(args) {

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
        api.selection.forEach(selectedElement => {
            const element = api.create.copy(selectedElement)
            api.modify.move.move(element, p, relative)
        })
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
        hotKeys: undefined,
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
        name: 'image',
        suggestion: 'image {p} {size} {href}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdImage,
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


