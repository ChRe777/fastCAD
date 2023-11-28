// COMMANDS.js
//

// Imports
//

import api from 'services/api'

import { argFns} from 'services/utils'
import { useCmdStore } from 'stores/cmd'

// Commands
//

// clear
//
function doCmdClear() {

    // Reset scene
    //
    api.newScene()

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
    let name = argFns.asString(args, 1)
    api.saveScene(name)
}

// load
//
function doCmdLoad(args) {
    let name = argFns.asString(args, 1)
    api.loadScene(name)
}

// move @10,0 or move 10,10
//
function doCmdMove(args) {
    const [p, relative] = argFns.asPoint2(args, 1)
    api.moveSelected(p, relative)
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
    api.viewZoomIn()
}

function doCmdZoomOut() {
    api.viewZoomOut()
}

// line 10,10 20,20
// line @10,10 20,20
// line @10,10 @20,20
// line 10,10 @20,20
//
function doCmdLine(args) {

    let [p1, relative1] = argFns.asPoint2(args, 1) || [{ x: -50, y: -50 }, false]
    let [p2, relative2] = argFns.asPoint2(args, 2) || [{ x: 50, y: 50 }, false]

    api.createLine(p1, relative1, p2, relative2)
}

// lineTo 100,100
// lineTo @200,200
//
function doCmdLineTo(args) {

    let [p2, relative2] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]

    api.createLineTo(p2, relative2)
}

// circle 10,10 50
//
function doCmdCircle(args) {

    let [p, relative] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let r = argFns.asFloat(args, 2) || 50

    api.createCircle(p, relative, r) 
}

// text 10,10 "text"
//
function doCmdText(args) {

    let [p, relative] = argFns.asPoint2(args, 1) || [{ x: 0, y: 0 }, false]
    let text = argFns.asString(args, 2) || "text"

    api.createText(p, relative, text)
}

// layer
//
function doCmdLayer(args) {

    let name = argFns.asString(args, 1)
    let description = argFns.asString(args, 2)

    api.createLayer(name, description)

}

// delete
//
function doCmdDelete(args) {
    api.destroySelected()
}

// deselect
//
function doCmdDeselect(args) {
    api.deselectAll()
}

// batch
//
function doCmdBatch(args) {
    // GUI
    const store = useStore()
    store.showBatch = !store.showBatch
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

    let prop = argFns.asString(args, 1)
    let value = argFns.asString(args, 2)

    api.modifySelected(prop, value)
}

// copy
//
function doCmdCopy(args) {
    api.copySelected()
}

// mirror y 300
//
function doCmdMirror(args) {
    
    let axis = argFns.asString(args, 1)
    let value = argFns.asFloat(args, 2)

    api.mirrorSelected(axis, value)
}

// message "Hello World"
//
function doCmdMessage(args) {
    let text = argFns.asString(args, 1)
    api.newMessage(text)
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


