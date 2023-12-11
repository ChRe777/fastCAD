// CommonEditor.js

// 
// see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation

import { useEditorStore } from 'stores/editor'
import { renderGroups } from 'editors/types'

// Attributes for Template
//
let attributeGroups = {
    title: 'Common Editor',
    groups: [
        [
            { name: 'fill', title: 'fill', type: 'color' },
            { name: 'fill-opacity', title: 'op', type: 'opacity' }
        ],
        [
            { name: 'stroke', title: 'stroke', type: 'color' },
            { name: 'stroke-opacity', title: 'op', type: 'opacity' }
        ],
        [

            { name: 'stroke-dasharray', title: 'dash', type: 'text' },
            { name: 'stroke-width', title: 'width', type: 'number' }
        ]
    ]
}

// Template
//
const template = renderGroups(attributeGroups)


// Data
//
function data() {
    return {
        store: useEditorStore(),
        labelWidth: 50
    }
}

// Components
//
export default {
    data,
    template,
    /*   methods: {
           updateAttributes() {
               this.store.updateAttributes()
           },
           handleEnterKeyPress() {
               this.updateAttributes()
           },
       },
   */
    computed: {
        editingAttributes() {
            return this.store.editingAttributes
        }
    }
}