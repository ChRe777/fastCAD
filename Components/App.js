// app.js
//

// Imports
//
import { useSelectionStore } from 'stores/selection'
import { useEditorStore } from 'stores/editor'
import { getSharedProperties, fillSharedValues, removeUndefined } from 'services/utils'


// Components
//
import Box from 'components/box'
import Ruler from 'components/ruler'
import CmdLine from 'components/cmdline'
import Editor from 'components/editor'
import Scene from 'components/scene'
import AppBar from 'components/appbar'
import Layer from 'components/layer'
import Message from 'components/message'

// Modals
//
import Settings from 'views/settings'
import Batch from 'views/batch'
import Export from 'views/export'

// Modals
//
const modals = `
<batch id="batch"></batch>
<export id="export"></export>
<settings id="settings"></settings>
`

// Template
//
const template = `
<div id="box"><box></box></div>
<div id="rulerHorz"><ruler type="horizontal"></ruler></div>
<div id="rulerVert"><ruler type="vertical"></ruler></div>
<div id="scene"><scene></scene></div>
<div id="cmdLine"><cmd-line></cmd-line></div>
<div id="editor"><editor></editor></div>
<div id="appbar"><app-bar></app-bar></div>
<div id="layer"><layer></layer></div>
<div id="customTooltip"></div>
<div id="message"><message></message></div>
`

// Data
//
function data() {
    return {
        selectionStore: useSelectionStore(),
        editorStore: useEditorStore()
    }
}

const onSelectedElements = {
    handler() {
        console.log("app - selectionStore.selectedElementsSet changed")
        updateEditingAttributes()
    },
    deep: true /* Watch changes of objects inside array */
}

const onSelectedLayers = {
    handler() {
        console.log("app - selectionStore.selectedLayersSet changed")
        updateLayerEditingAttributes()
    },
    deep: true
}

const onEditingAttributes = {
    handler() {
        console.log("app - editorStore.editingAttributes changed")
        updateSelectionAttributes()
    },
    deep: true
}

/*
const onLayerEditingAttributes = {
    handler() {
        console.log("app - editorStore.layerEditingAttributes changed")
        // TODO:
        //updateLayerAttributes()
    },
    deep: true 
}
*/

// Component
//
export default {
    data,
    template: template + modals,
    components: {
        Box,
        Ruler,
        CmdLine,
        Editor,
        Scene,
        AppBar,
        Batch,
        Export,
        Settings,
        Layer,
        Message
    },
    watch: {
        'selectionStore.selectedElementsSet': onSelectedElements,
        'selectionStore.selectedLayersSet': onSelectedLayers,
        'editorStore.editingAttributes': onEditingAttributes,
        // This is done in LayerEditor
        //'editorStore.layerEditingAttributes': onLayerEditingAttributes
    },
}

function updateLayerEditingAttributes() {

    const selectionStore = useSelectionStore()
    const editorStore = useEditorStore()

    console.log("updateLayerEditingAttributes layers:", selectionStore.selectedLayersSet)

    if (selectionStore.selectedLayersSet.size >= 1) {
        const selectedLayer = Array.from(selectionStore.selectedLayersSet)[0] // Set to Array
        editorStore.layerEditingAttributes = selectedLayer
    } else {
        editorStore.layerEditingAttributes = {}
    }
}

// see https://stackoverflow.com/questions/208105/how-do-i-remove-a-property-from-a-javascript-object
//
function updateEditingAttributes() {
    const editorStore = useEditorStore()
    const selectionStore = useSelectionStore()

    if (selectionStore.selectedElementsSet.size === 0) {
        editorStore.editingAttributes = {}
        return
    }

    if (selectionStore.selectedElementsSet.size === 1) {
        const selectedElement = Array.from(selectionStore.selectedElementsSet)[0]
        const { id, type, ...editingAttributes } = selectedElement
        editorStore.editingAttributes = editingAttributes
        console.log("editorStore.editingAttributes", editorStore.editingAttributes)
    } else {

        const sharedProperties = getSharedProperties(Array.from(selectionStore.selectedElementsSet))
        const { id, type, ...sharedPropertiesWithout } = sharedProperties

        // { id:"1", type:"circle", fill: '#ff0000', stroke: '#000000', 'stroke-dasharray': '5,5'}
        // { id:"2", type:"line"  , fill: '#ff0000', stroke: '#000010', 'stroke-dasharray': '5,5'}
        // ---------------------------------------------------------------------------------------
        // {                        fill: '#ff0000', stroke: undefined, 'stroke-dasharray': '5,5'}
        // {                        fill: '#ff0000',                  , 'stroke-dasharray': '5,5'}
        // ---------------------------------------------------------------------------------------
        // {                        fill: '#ff0000',                  , 'stroke-dasharray': '5,5'}

        let editingAttributes = fillSharedValues(Array.from(selectionStore.selectedElementsSet), sharedPropertiesWithout)
        editingAttributes = removeUndefined(editingAttributes)

        editorStore.editingAttributes = editingAttributes
        console.log("updateEditingAttributes:", editorStore.editingAttributes)
    }
}


function updateSelectionAttributes() {
    const editorStore = useEditorStore()
    const selectionStore = useSelectionStore()

    // Update the selected element's attributes with the values in editingAttributes
    if (selectionStore.selectedElementsSet.size === 1) {
        // Copy the values of all of the enumerable own properties from one or 
        // more source objects to a target object. Returns the target object
        let selectedElement = Array.from(selectionStore.selectedElementsSet)[0]
        Object.assign(selectedElement, editorStore.editingAttributes);
    }

    // HERE ONLY SHARED ATTRIBUTES SHOULD BE PUSHED BACK!!!

    if (selectionStore.selectedElementsSet.size > 1) {
        selectionStore.selectedElementsSet.forEach(selectedElement => {
            //The Object.assign() static method copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.
            Object.assign(selectedElement, editorStore.editingAttributes);
        })
    }
}
