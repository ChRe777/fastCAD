// SvgElement.js

// Is a recursive template, because Layers can have Layers as childs

// Imports
//
import api from 'api/api'
import { svgElementTypes } from 'components/types'

// Template
//
const template = `
${svgElementTypes}
<template v-if="element.type == 'g' && element.subtype == 'layer'">
    <g  :id="element.id" 
        :fill="element.fill" 
        :stroke="element.stroke" 
        :stroke-width="element['stroke-width']" 
        :stroke-opacity="element['stroke-opacity']"
        :style="element.style"
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