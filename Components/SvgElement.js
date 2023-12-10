// SvgElement.js

// Is a recursive template, because Layers can have Layers as childs

// Imports
//
import api from 'api/api'
import { svgElementTypes, svgLayerAttributes } from 'components/types'

// Template
//
const template = `
${svgElementTypes}
<template v-if="element.type == 'g' && element.subtype == 'layer'">
    <g data-type="layer"
       ${svgLayerAttributes}
    >
        <template v-for="child in element.elements">
            <svg-element :element="child" :parent="element"></svg-element>
        </template>
    </g>
</template>
`

// Functions
//
function selectElement(element, parent) {

    if (api.selection.isSelected(element)) {
        api.selection.deselect(element, parent)
    } else {
        api.selection.select(element, parent)
    }
}

function isSelected(element) {
    return api.selection.isSelected(element)
}

// Export components
//
export default {
    props: ['element', 'parent'],
    template,
    methods: {
        selectElement,
        isSelected
    }
}