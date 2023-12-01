// ModifySelected.js

// Imports
//
import { useStore } from 'stores/store' // TODO: MAKE API CALL

import selections from 'api/selection'
import layers from 'api/layer'

// Functions
//
function modifySelected(prop, value) {
    const store = useStore()

    // set PROP VALUE
    // set layer {layerName}
    if (prop === 'layer') {
        console.log("modifySelected", prop, value)
        let layerName = value
        return setLayer_(layerName)
    }

    selections.forEach(selectedElement => {
        let attrs = {};
        attrs[prop] = value
        api.modify(selectedElement, selectedElement.type, attrs)
    })

    // TODO: Make API CALL for lastCreatedElement
    if (store.lastCreatedElement !== undefined) {
        let attrs = {};
        attrs[prop] = value
        api.modify(store.lastCreatedElement, store.lastCreatedElement.type, attrs)
    }
}


function setLayer_(name) {

    const newLayer = getLayerByName(name)
    selections.forEach(selectedElement => {

        function removeElement(layer) {
            removeFromLayer(layer, selectedElement)
        }

        layers.forEach(removeElement)
        addToLayer(newLayer, selectedElement)
    })
}

// Move
//
function moveSelected(p, relative) {

    selections.forEach(selectedElement => {
        modify.move(selectedElement, p, relative)
    })
}

// Mirror
//
function mirrorSelected(axis, value) {

    selections.forEach(selectedElement => {
        let { id, type, ...attrs } = selectedElement
        let obj = api.create(type, attrs)
        api.mirror(obj, type, axis, value)
    })

}

// Exports
//
export default {
    modifySelected,
    moveSelected,
    mirrorSelected
}
