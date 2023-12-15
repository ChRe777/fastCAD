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
    api.selection.clear()
    api.editor.clear()

    //
    // Create a default layer
    //
    let attrs = {
        'name': 'layer0',
        'description': 'Default layer 0'
    }

    const newLayer = api.scene.createElement('layer', attrs)
    api.scene.appendLayer(newLayer)
    api.selection.setCurrentLayer(newLayer)
}

// save
//
function doCmdSave(args) {
    let name = argFns.asString(args, 1)
    const successFn = function (data, name) {
        console.info("Loaded data:", data)
        api.message.create(`Saved ${name}`)
    }
    api.io.save(name, successFn)
}

// load
//
function doCmdLoad(args) {

    let successFn = function (scene, name) {
        api.scene.set(scene)
        api.layer.selectFirst()
        api.message.create(`Loaded ${name}`) // api.message.create
    }

    let name = argFns.asString(args, 1)
    api.io.load(name, successFn)
}

// move @10,0 or move 10,10
//
function doCmdMove(args) {
    const p = argFns.asPoint2(args, 1)

    let attrs = {
        'p': p
    }

    api.selection.forEach(selectedElement => {
        api.element.move(selectedElement, attrs)
    })
}

// rotate 45° 10,0 
//
function doCmdRotate(args) {

    const angle = argFns.asFloat(args, 1)
    const p = argFns.asPoint2(args, 2) || [{ x: 0, y: 0 }, true]

    let attrs = {
        'p': p,
        'angle': angle
    }
    console.log(attrs)

    api.selection.forEach(selectedElement => {
        api.element.rotate(selectedElement, attrs)
    })
}


// group selected together
//
function doCmdGroup(args) {
    api.create.group(Array.from(api.selection.elements()))
}

async function useTool(toolName) {
    let tool = api.tool.activate(toolName)
    await tool.start()
    api.tool.deactivate(tool)
}

// zoom in 
// zoom out
//
async function doCmdZoom(args) {

    if (args.length == 1) {
        useTool("zoom")
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

// panning
//
async function doCmdPan(args) {

    if (args.length == 1) {
        useTool("pan")
        return
    }

    const [p, _] = argFns.asPoint2(args, 1)
    api.view.pan(p.x, p.y)
}

// circle 10,10 50
//
function doCmdCircle(args) {

    let p = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let r = argFns.asFloat(args, 2) || 50

    const attrs = {
        'p': p,
        'r': r
    }

    api.scene.createElement('circle', attrs)
}

// line 10,10 20,20
// line @10,10 20,20
// line @10,10 @20,20
// line 10,10 @20,20
//
function doCmdLine(args) {

    //let [p1, relative1] = argFns.asPoint2(args, 1) || [{ x: -50, y: -50 }, false]
    //let [p2, relative2] = argFns.asPoint2(args, 2) || [{ x: 50, y: 50 }, false]

    let p1 = argFns.asPoint2(args, 1) || [{ x: -50, y: -50 }, false]
    let p2 = argFns.asPoint2(args, 2) || [{ x: 50, y: 50 }, false]


    let attrs = {
        'p1': p1,
        'p2': p2
    }
    api.scene.createElement('line', attrs)
}

// lineTo 100,100
// lineTo @200,200
//
function doCmdLineTo(args) {

    let p2 = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]

    const attrs = {
        'p2': p2
    }

    api.scene.createElement('lineTo', attrs)
}



// ellipse 10,10 50 50
//
function doCmdEllipse(args) {

    let p = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let rx = argFns.asFloat(args, 2) || 50
    let ry = argFns.asFloat(args, 2) || 30

    const attrs = {
        'p': p,
        'rx': rx,
        'ry': ry
    }

    api.scene.createElement('ellipse', attrs)
}

// text 10,10 "text"
//
function doCmdText(args) {

    // Multiline
    // see https://stackoverflow.com/questions/31469134/how-to-display-multiple-lines-of-text-in-svg

    let p = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let text = argFns.asString(args, 2) || "text"

    let attrs = {
        'p': p,
        'text': text
    }

    api.scene.createElement('text', attrs)
}

// path 0,0 h 10 v 10
//
function doCmdPath(args) {

    // path 0,0 h 10 v 10
    let d = "M 0 0 h 100 v 100 h 50 v 50 h 25 v 25"
    if (args.length > 2)
        d = args.slice(1).join(" ")

    let attrs = {
        'd': d
    }

    api.scene.createElement('path', attrs)

}

function getPoints(args) {
    let points = []

    args.forEach((_, index) => {
        if (index != 0) { // First args is cmd name e.g. 'polyline'
            let pRel = argFns.asPoint2(args, index) || [{ x: 0, y: 0 }, false]
            points.push(pRel)
        }
    })

    return points
}


// polyline 10,10 @20,30 30,30
//
async function doCmdPolyline(args) {

    if (args.length == 1) { // e.g. pl
        useTool("polyline")
        return
    }

    let points = getPoints(args)
    let attrs = {
        'points': points
    }

    api.scene.createElement('polyline', attrs)
}

// polyline 10,10 @20,30 30,30
//
function doCmdPolygon(args) {

    //if (args.length == 1) { // e.g. pl
    //    useTool("polygon")
    //    return
    //}

    let points = getPoints(args)

    let attrs = {
        'points': points
    }

    api.scene.createElement('polygon', attrs)
}

function doCmdImage(args) {

    // image 0,0 100,100 http://images.com/img.png
    //
    let p = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let size = argFns.asPoint2(args, 2) || [{ x: 100, y: 100 }, false]
    let href = argFns.asString(args, 3) || "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-1024.png"

    let attrs = {
        'p': p,
        'size': size,
        'href': href
    }

    api.scene.createElement('image', attrs)
}

// rect 0,0 100,100
// rect @0,0 @100,100
//
function doCmdRect(args) {

    let p = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let size = argFns.asPoint2(args, 2) || [{ x: 100, y: 100 }, true]

    let attrs = {
        'p': p,
        'size': size
    }

    api.scene.createElement('rect', attrs)
}

// layer name description
//
function doCmdLayer(args) {

    let name = argFns.asString(args, 1) || "newLayer"
    let description = argFns.asString(args, 2) || "newLayer"

    let attrs = {
        'name': name,
        'description': description
    }

    let layer = api.scene.createLayer(attrs)
    api.selection.setCurrentLayer(layer)
}

// delete {all} // TODO: What args are useful?
//
function doCmdDelete(args) {

    api.selection.forEach(selectedElement => {
        api.scene.removeElement(selectedElement)
    })

    api.selection.clear()
}

// select // TODO: Other args e.g. > select {id}
//
async function doCmdSelect(args) {
    if (args.length == 1) {
        useTool("selection")
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
// set fill #ff00ff
//
function doCmdSet(args) {

    let attrName = argFns.asString(args, 1)
    let attrValue = argFns.asString(args, 2)

    function setLayer_() {
        let layerName = attrValue
        let toLayer = api.scene.getLayerByName(layerName)
        if (toLayer === undefined) {
            return
        }

        api.selection.forEach(selectedElement => {
            console.log("cmdSet selectedElement", selectedElement)
            api.layer.moveElement(selectedElement, toLayer)

        })
    }

    // set layer {layerName} // TODO: Name can change
    //
    if (attrName === 'layer') {
        setLayer_()
        return
    }

    // set cy 0
    // set fill #ff00ff
    //
    api.selection.forEach(selectedElement => {
        let attrs = {}
        attrs[attrName] = attrValue
        api.element.setAttribute(selectedElement, attrs)
    })
}

// copy (selected)
//
function doCmdCopy(args) {

    let [p, relative] = argFns.asPoint2(args, 1) || [{ x: 10, y: 10 }, true]

    // No args copy the selected
    if (args.slice(1).length === 0) {

        const copiedElements = []
        api.selection.forEach(selectedElement => {
            const newElement = api.create.copy(selectedElement)
            copiedElements.push(newElement)
            api.element.move(newElement, p, relative)
        })

        // TODO: Select all or last
        api.selection.clear()
        // TODO: FIX
        // api.selection.selectMany(copiedElements)
    }

}

// mirror y 300 {copy}
//
function doCmdMirror(args) {

    let axis = argFns.asString(args, 1)
    let value = argFns.asFloat(args, 2)
    let copy = argFns.asString(args, 3) || false

    let attrs = {
        'axis': axis,
        'value': value,
        'copy': copy
    }

    api.selection.forEach(selectedElement => {
        api.element.mirror(selectedElement, attrs)
    })

}

// message "Hello World" // TODO:
//
function doCmdMessage(args) {
    let text = argFns.asString(args, 1)
    api.create.Message(text)
}

// snow on/off
//
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

// Imports
//
const { randomUUID } = new ShortUniqueId({ length: 10 });


// Init 
//
export function init() {

    const cmdStore = useCmdStore()

    // Register Commands
    //

    api.cmd.register({
        uuid: randomUUID(),
        name: 'load',
        suggestion: 'load',
        shortCuts: [''],
        action: doCmdLoad,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'delete',
        suggestion: 'delete',
        shortCuts: ['backspace'],
        hotKeys: undefined,
        action: doCmdDelete,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'save',
        suggestion: 'save',
        shortCuts: ['ctrl+s'], // ??
        action: doCmdSave,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'clear',
        suggestion: 'clear',
        shortCuts: ['ctrl+d'], // ??
        action: doCmdClear,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'line',
        suggestion: 'line {p1} {p2}',
        shortCuts: [],
        hotKeys: 'l',
        action: doCmdLine,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'lineTo',
        suggestion: 'lineTo {p1}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdLineTo,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'circle',
        suggestion: 'circle {p} {r}',
        shortCuts: [],
        hotKeys: 'ci',
        action: doCmdCircle,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'ellipse',
        suggestion: 'ellipse {p} {rx} {rx}',
        shortCuts: [],
        hotKeys: 'el',
        action: doCmdEllipse,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'image',
        suggestion: 'image {p} {size} {href}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdImage,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'text',
        suggestion: 'text {p} {string}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdText,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'path',
        suggestion: 'path {string}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdPath,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'polyline',
        suggestion: 'polyline {string}',
        shortCuts: [],
        hotKeys: 'pl',
        action: doCmdPolyline,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'polygon',
        suggestion: 'polygon {string}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdPolygon,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'rect',
        suggestion: 'rect {x,y} {w,h}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdRect,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'group',
        suggestion: 'group',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdGroup,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'layer',
        suggestion: 'layer {name} {description}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdLayer,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'move',
        suggestion: 'move {p}',
        shortCuts: [],
        hotKeys: 'm',
        action: doCmdMove,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'rotate',
        suggestion: 'rotate {angle} {{p}}',
        shortCuts: [],
        hotKeys: 'r',
        action: doCmdRotate,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'select',
        suggestion: 'select',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdSelect,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'deselect',
        suggestion: 'deselect',
        shortCuts: ['esc'],
        hotKeys: undefined,
        action: doCmdDeselect,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'zoom',
        suggestion: 'zoom {in/out}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdZoom,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'pan',
        suggestion: 'pan {x,y}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdPan,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'batch',
        suggestion: 'batch',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdBatch,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'export',
        suggestion: 'export',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdExport,
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'settings',
        suggestion: 'settings',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdSettings
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'set',
        suggestion: 'set {prop} {value} ...',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdSet
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'copy',
        suggestion: 'copy',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdCopy
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'mirror',
        suggestion: 'mirror {x|y} {value} {copy}',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdMirror
    })

    api.cmd.register({
        uuid: randomUUID(),
        name: 'message {text}',
        suggestion: 'message',
        shortCuts: [],
        hotKeys: undefined,
        action: doCmdMessage
    })

    api.cmd.register({
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


