// SvgElement.js

// Is a recursive template, because Layers can have Layers as childs

// Imports
//
import api from 'api/api'
import { svgElementTypes, svgLayerAttributes } from 'components/types'

// TODO: ReThink ... ReHear :-)
/*
"elements": [
    {
        "svg-type": "g",
        "type": "layer",
        "visibility": "visible",

*/
// Template
//

const svgLayerChilds = `
    <svg-element v-for="element in element.elements" :element="element"></svg-element>
`

const templateNEW = `
    ${svgElementTypes}
    <g v-if="element.type == 'layer' && element['svg-type'] == 'g'"
       ${svgLayerAttributes}
    >
       ${svgLayerChilds}
    </g>

`

const template = `
${svgElementTypes}
<template v-if="element.type == 'g' && element.subtype == 'layer'">
    <g data-type="layer"
       ${svgLayerAttributes}
    >
        <template v-for="element in element.elements">
            <svg-element :element="element"></svg-element>
        </template>
    </g>
</template>
`

// Functions
//
function selectElement(element) {
    if (api.selection.isSelected(element)) {
        api.selection.deselect(element)
    } else {
        api.selection.select(element)
    }
}

function isSelected(element) {
    return api.selection.isSelected(element)
}

// Export components
//
export default {
    props: ['element'],
    template,
    methods: {
        selectElement,
        isSelected
    }
}