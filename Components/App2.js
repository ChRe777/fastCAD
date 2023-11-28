// app.js
//

// Imports
//
import { useSelectionStore } from "stores/selection"
import { useEditorStore } from "stores/editor"
import { getSharedProperties, fillSharedValues, removeUndefined } from 'scripts/utils'


// Components
//
import Box from 'components/box'
import Ruler from 'components/ruler'
import CmdLine from 'components/cmdline'
import Editor from 'components/editor'
import Scene from 'components/scene'
import AppBar from 'components/appbar'
import Batch from 'components/batch'
import Settings from "components/settings"
import Layer from 'components/layer'
import Message from 'components/message'

// Modals
//
const modals = `
<batch id="batch"></batch>
<settings id="settings"></settings>
`

// Template
//
const template = `
<div id="box"><box></box></div>
<div id="rulerHorz"><ruler type="horizontal"></ruler></div>
<div id="rulerVert"><ruler type="vertical"></ruler></div>
<div id="scene"><scene></scene><message></message></div>
<div id="cmdLine"><cmd-line></cmd-line></div>
<div id="editor"><editor></editor></div>
<div id="appbar"><app-bar></app-bar></div>
<div id="layer"><layer></layer></div>
<div id="customTooltip"></div>
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
        console.log("app - selectionStore.selectedElements changed")
        updateEditingAttributes()
    },
    deep: true /* Watch changes of objects inside array */
}

const onSelectedLayers = {
    handler() {
        console.log("app - selectionStore.selectedLayers changed")
        updateLayerEditingAttributes()
    },
    deep: true /* Watch changes of objects inside array */
}

const onEditingAttributes = {
    handler() {
        console.log("app - editorStore.editingAttributes changed")
        updateSelectionAttributes()
    },
    deep: true /* Watch changes of objects inside array */
}

const onLayerEditingAttributes = {
    handler() {
        console.log("app - editorStore.layerEditingAttributes changed")
        // TODO:
        //updateSelectionAttributes()
    },
    deep: true /* Watch changes of objects inside array */
}

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
        Settings,
        Layer,
        Message
    },
    watch: {
        'selectionStore.selectedElements': onSelectedElements,
        'selectionStore.selectedLayers': onSelectedLayers,
        'editorStore.editingAttributes': onEditingAttributes,
        'editorStore.layerEditingAttributes': onLayerEditingAttributes
    },
}

function updateLayerEditingAttributes() {

    const selectionStore = useSelectionStore()
    const editorStore = useEditorStore()

    if (selectionStore.selectedLayers.length >= 1) {
        // TODO: Shared Attributes if multi-layer-selection
        editorStore.layerEditingAttributes = selectionStore.selectedLayers[0]
    } else {
        editorStore.layerEditingAttributes = {}
    }
}

// see https://stackoverflow.com/questions/208105/how-do-i-remove-a-property-from-a-javascript-object
//
function updateEditingAttributes() {
    const editorStore = useEditorStore()
    const selectionStore = useSelectionStore()

    if (selectionStore.selectedElements.length === 1) {
        let element = selectionStore.selectedElements[0]

        const { id, type, ...editingAttributes } = element
        editorStore.editingAttributes = editingAttributes

        console.log("editorStore.editingAttributes", editorStore.editingAttributes)

    } else if (selectionStore.selectedElements.length === 0) {
        editorStore.editingAttributes = {}
    } else {

        const sharedProperties = getSharedProperties(selectionStore.selectedElements)
        const { id, type, ...sharedPropertiesWithout } = sharedProperties

        // { id:"1", type:"circle", fill: '#ff0000', stroke: '#000000', 'stroke-dasharray': '5,5'}
        // { id:"2", type:"line"  , fill: '#ff0000', stroke: '#000010', 'stroke-dasharray': '5,5'}
        // ---------------------------------------------------------------------------------------
        // {                        fill: '#ff0000', stroke: undefined, 'stroke-dasharray': '5,5'}
        // {                        fill: '#ff0000',                  , 'stroke-dasharray': '5,5'}
        // ---------------------------------------------------------------------------------------
        // {                        fill: '#ff0000',                  , 'stroke-dasharray': '5,5'}

        let editingAttributes = fillSharedValues(selectionStore.selectedElements, sharedPropertiesWithout)
        editingAttributes = removeUndefined(editingAttributes)

        editorStore.editingAttributes = editingAttributes
        console.log("updateEditingAttributes:", editorStore.editingAttributes)
    }
}


function updateSelectionAttributes() {
    const editorStore = useEditorStore()
    const selectionStore = useSelectionStore()

    // Update the selected element's attributes with the values in editingAttributes
    if (selectionStore.selectedElements.length === 1) {
        // Copy the values of all of the enumerable own properties from one or 
        // more source objects to a target object. Returns the target object
        let selectedElement = selectionStore.selectedElements[0]
        Object.assign(selectedElement, editorStore.editingAttributes);
    }

    // HERE ONLY SHARED ATTRIBUTES SHOULD BE PUSHED BACK!!!

    if (selectionStore.selectedElements.length > 1) {
        selectionStore.selectedElements.forEach(selectedElement => {
            //The Object.assign() static method copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.
            Object.assign(selectedElement, editorStore.editingAttributes);
        })
    }
}
