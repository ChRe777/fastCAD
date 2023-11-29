// api.js
//

// Is like a CRUD(S) .. Create, Update and Delete (+ Select)

// create -> id / id -> destroy
// id -> modify -> id
// id -> select -> id/ id -> deselect -> id


//
// [UI/LOGIC] <--> [STORE] <--> [IO] <--> [SERVER] <--> [DB/FILE]
//

// Imports
//

import io from 'services/io'

// Stores are the models
//
import { useStore } from 'stores/store'
import { useCmdStore } from 'stores/cmd'
import { useViewStore } from 'stores/view'
import { useEditorStore } from 'stores/editor'
import { useMessageStore } from 'stores/message'
import { useSelectionStore } from 'stores/selection'

// Helper
//
import { addPoints, subPoints } from 'services/utils'
import { defaults } from 'services/defaults'

// Create unique id
// see https://shortunique.id
//
const { randomUUID } = new ShortUniqueId({ length: 10 });

// create('line', {x1:0,y1:0,x2:0,y2:0}) -> 'line-1'
//
function create(type, attrs) {

    if (type === 'layer') {
        return createLayer_(type, attrs)
    }

    // Create new object
    //
    let obj = {
        "type": type,
        "id": type + "-" + randomUUID(),
        ...attrs
    }

    // Place into current active Layer
    //
    let currentLayer = getCurrentLayer()
    currentLayer.elements.push(obj)

    // Store last created element
    //
    const store = useStore()
    store.lastCreatedElement = obj

    return obj
}

// Create Layer helper
//
function createLayer_(type, attrs) {

    const store = useStore()

    let newLayer = {
        "type": type,
        "id": type + "-" + randomUUID(),
        ...attrs,
        "elements": [],
        "layer-open": false,
        "layers": []
    }

    store.scene.layers.push(newLayer)

    return newLayer
}


// TODO: REFACTOR
function removeFromLayer_(layer, element) {
    layer.elements = layer.elements.filter(obj => obj.id !== element.id)
    if (layer.layers != undefined) { // layer should be []
        for (let subLayer of layer.layers) {
            removeFromLayer_(subLayer, element)
        }
    }
}

// destroy('line-1')
//
function destroy(element, type, attrs) {

    const store = useStore()

    // Remove from all layers
    //
    store.scene.layers.map((layer) => removeFromLayer_(layer, element))

    // if destroyed was last element
    //
    if (store.lastCreatedElement != undefined) {
        if (store.lastCreatedElement.id === element.id) {
            store.lastCreatedElement = undefined
        }
    }
}


// modify
//
function modify(element, type, attrs) {
    if (element === undefined) {
        return
    }

    if (element.type === type) {
        Object.assign(element, attrs)
    }
    return element
}


function mirror(element, type, axis, value) {

    let attrsMirrored = {}

    // line 
    //
    if (type === 'line') {
        if (axis === 'y') {
            attrsMirrored['x1'] = ((parseFloat(element['x1']) - value) * -1.0) + value
            attrsMirrored['x2'] = ((parseFloat(element['x2']) - value) * -1.0) + value
        }
        if (axis === 'x') {
            attrsMirrored['y1'] = ((parseFloat(element['y1']) - value) * -1.0) + value
            attrsMirrored['y2'] = ((parseFloat(element['y2']) - value) * -1.0) + value
        }
    }

    api.modify(element, type, attrsMirrored)
}

function isSelected(element) {
    const store = useSelectionStore()
    return store.selectedElementsSet.has(element)
}

// select
//
function select(element, type, attrs) {

    const store = useSelectionStore()

    if (type == 'layer') {
        setCurrentLayer(element)
        return element
    }
    store.selectedElementsSet.add(element)
    return element
}

function selectFirstLayer() {
    const store = useStore()
    const selectionStore = useSelectionStore()

    if (store.scene.layers && store.scene.layers.length > 0) {
        selectionStore.selectedLayersSet.clear()
        selectionStore.selectedLayersSet.add(store.scene.layers[0])
    }
}

// deselect
//
function deselect(element, type, attrs) {
    const store = useSelectionStore()
    store.selectedElementsSet.delete(element);
    return element
}

// set current layer
//
function setCurrentLayer(layer) {
    const selectionStore = useSelectionStore()
    selectionStore.selectedLayersSet.clear()
    selectionStore.selectedLayersSet.add(layer)
}

function getCurrentLayer() {
    const selectionStore = useSelectionStore()
    return Array.from(selectionStore.selectedLayersSet)[0]
}

// is current layer
//
function isCurrentLayer(layer) {
    const selectionStore = useSelectionStore()
    return selectionStore.selectedLayersSet.has(layer)
}

// get Element by Id
//
function getElementById_(layer, id) {

    let element = layer.elements.find((obj) => obj.id === id)
    if (element != undefined) {
        return element
    }

    for (let subLayer in layer.layers) {
        let element_ = getElementById_(subLayer, id)
        if (element_ != undefined) {
            return element_
        }
    }
}

function getElementById(id) {

    const store = useStore()

    for (let layer in store.scene.layers) {
        let element = getElementById_(layer, id)
        if (element != undefined) {
            return element
        }
    }

    return undefined
}

function toogleLayerOpen(layer) {
    layer['layers-open'] = !layer['layers-open']
}

function hasLayerChilds(layer) {
    if (layer.layers !== undefined) {
        return layer.layers.length > 0
    }
    return false
}

function numLayerChilds(layer) {
    let childs = layer.elements.length

    if (layer.layers != undefined) {
        return childs + layer.layers
            .map(numLayerChilds)
            .reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            }, 0);
    }

    return childs
}

function isLayerOpen(layer) {
    return layer['layers-open']
}

// TODO: Refactor
function getLayerById_(id, layers) {

    for (const layer of layers) {
        if (layer.id === id) {
            return layer
        }
        if (layer.layers !== undefined) {
            let found = getLayerById_(id, layer.layers)
            if (found !== undefined) {
                return found
            }
        }
    }

    return undefined
}

function getLayerById(id) {
    const store = useStore()
    return getLayerById_(id, store.scene.layers)
}

function getLayerByName_(name, layers) {

    for (const layer of layers) {
        if (layer.name === name) {
            return layer
        }
        if (layer.layers !== undefined) {
            let found = getLayerByName_(name, layer.layers)
            if (found !== undefined) {
                return found
            }
        }
    }

    return undefined
}

function getLayerByName(name) {
    const store = useStore()
    return getLayerByName_(name, store.scene.layers)
}


function clearSelection() {
    const selectionStore = useSelectionStore()
    selectionStore.selectedElementsSet.clear()
    selectionStore.selectedLayersSet.clear()
}

function clearEditor() {
    const editorStore = useEditorStore()
    editorStore.editingAttributes = {}
    editorStore.layerEditingAttributes = {}
}

function clearScene() {
    const store = useStore()
    store.scene.layers = []
}


function newScene() {

    clearScene()
    clearSelection()
    clearEditor()
}

function saveScene(name) {
    const store = useStore()
    const messagesStore = useMessageStore()

    const successFn = function (data, name) {
        console.log("data", data)
        messagesStore.messages.push(`Saved ${name}`)
    }

    io.save(store.scene, name, successFn)
}

function setScene_(scene) {
    const store = useStore()
    store.scene = scene
}

function loadScene(name) {

    let onLoaded = function (scene, name) {

        setScene_(scene)
        selectFirstLayer()
        createMessage(`Loaded ${name}`)

    }

    io.load(name, onLoaded)
}

function forEachSelected(fn) {
    const selectionStore = useSelectionStore()
    selectionStore.selectedElementsSet.forEach(selectedElement => fn(selectedElement))
}

function destroySelected() {


    // Remove from layers
    //
    forEachSelected(selectedElement => {
        api.destroy(selectedElement)
    })

    // Remove from selection
    //
    store.selectedElementsSet.clear()
}

function copySelected() {
    forEachSelected(selectedElement => {
        let { id, type, ...attrs } = selectedElement
        api.create(type, attrs)
    })
}

function mirrorSelected(axis, value) {

    forEachSelected(selectedElement => {
        let { id, type, ...attrs } = selectedElement
        let obj = api.create(type, attrs)
        api.mirror(obj, type, axis, value)
    })

}

function deselectAll() {
    const selectionStore = useSelectionStore()
    selectionStore.selectedElementsSet.clear()
}


function forEachLayer_(fn, layers) {
    layers.forEach((layer) => {
        fn(layer)
        if (layer.layers) {
            forEachLayer_(fn, layer.layers)
        }
    })
}

function forEachLayer(fn) {
    const store = useStore()
    forEachLayer_(fn, store.scene.layers)
}

function removeFromLayer(layer, element) {
    layer.elements = layer.elements.filter(obj => obj.id !== element.id)
}

function addToLayer(layer, element) {
    layer.elements.push(element)
}

function setLayer_(name) {

    const newLayer = getLayerByName(name)
    forEachSelected(selectedElement => {

        function removeElement(layer) {
            removeFromLayer(layer, selectedElement)
        }

        forEachLayer(removeElement)
        addToLayer(newLayer, selectedElement)
    })
}

function modifySelected(prop, value) {
    const store = useStore()

    // set PROP VALUE
    // set layer {layerName}
    if (prop === 'layer') {
        console.log("modifySelected", prop, value)
        let layerName = value
        return setLayer_(layerName)
    }

    forEachSelected(selectedElement => {
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

function moveSelected(p, relative) {

    forEachSelected(selectedElement => {
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

function createMessage(text) {
    const messageStore = useMessageStore()
    messageStore.messages.push(text)
}

function viewZoomIn() {
    const viewStore = useViewStore()
    let step = Math.log2(viewStore.zoomFactor)

    // -19 .. 19
    if (-19 <= step && step < 19) {
        viewStore.zoomFactor *= 2;
    }
}

function viewZoomOut() {
    const viewStore = useViewStore()
    let step = Math.log2(viewStore.zoomFactor)

    // -19 .. 19
    if (-19 < step && step <= 19) {
        viewStore.zoomFactor /= 2;
    }
}

function createLine(p1, relative1, p2, relative2) {

    const store = useStore()

    if (relative1) {
        p1 = addPoints(store.lastPoint, p1)
    }

    if (relative2) {
        p2 = addPoints(p1, p2)
    }

    create('line', {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    store.lastPoint = p2
}

function createLineTo(p2, relative2) {

    const store = useStore()

    if (store.lastPoint !== undefined) {
        p1 = store.lastPoint
    }

    if (relative2) {
        p2 = addPoints(p1, p2)
    }

    create('line', {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        'stroke': defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    store.lastPoint = p2
}

function createCircle(p, relative, r) {

    const store = useStore()

    if (relative && store.lastPoint !== undefined) {
        p = addPoints(store.lastPoint, p)
    }

    create('circle', {
        cx: p.x,
        cy: p.y,
        r: r,
        fill: defaults.style.fill,
        stroke: defaults.style.stroke,
        'stroke-width': defaults.style['stroke-width']
    })

    store.lastPoint = p
}

function createText(p, relative, text) {

    const store = useStore()

    if (relative && store.lastPoint !== undefined) {
        p = addPoints(store.lastPoint, p)
    }

    create('text', {
        x: p.x,
        y: p.y,
        text: text,
        "font-family": defaults.font.family,
        "font-size": defaults.font.size,
        "fill": defaults.style.fill,
        "stroke": defaults.style.stroke,
        "stroke-width": 0 //defaults.style['stroke-width']
    })

    store.lastPoint = p
}



function createLayer(name, description) {

    const newLayer = create("layer", {
        'name': name,
        'description': description,
        ...defaults.layer
    })

    setCurrentLayer(newLayer)
}

function invokeCmdByName(cmdName, args) {
    const cmdStore = useCmdStore()
    if (cmdName in cmdStore.registeredCmdsByName) {
        const cmd = cmdStore.registeredCmdsByName[cmdName]
        if (cmd === undefined) {
            console.log(cmdName, "not found in command store")
            return false
        } else {
            try {
                cmd.action(args)
            } catch (error) {
                console.log(cmdName, "error", error.message)
                return false
            }
        }
    }
}

// Export API
//
const api = {
    create,
    destroy,
    modify,
    //
    mirror,
    //
    select,
    deselect,
    deselectAll,
    isSelected,
    //
    getElementById,
    //
    setCurrentLayer,
    getCurrentLayer,
    isCurrentLayer,
    getLayerById,
    getLayerByName,
    hasLayerChilds,
    numLayerChilds,
    isLayerOpen,
    toogleLayerOpen,
    //
    newScene,
    saveScene,
    loadScene,
    //
    // TODO: Refactor
    //
    destroySelected,
    copySelected,
    mirrorSelected,
    modifySelected,
    moveSelected,
    //
    //
    createMessage,
    //
    viewZoomIn,
    viewZoomOut,
    //
    createLayer,
    createLine,
    createLineTo,
    createCircle,
    createText,
    //
    invokeCmdByName
}

export default api;