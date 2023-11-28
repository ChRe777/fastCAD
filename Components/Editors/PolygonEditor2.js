// polyline.js

// Imports
//
import { useEditorStore } from 'stores/editor'
import { renderGroups } from './AttributeTypes2.js'

// Attributes for Template
//
let attributeGroups = {
    title: 'Polygon Editor',
    groups: [
        [
            { name: 'points', title: 'points', type: 'text' }
        ],
        [
            { name: 'pathLength', title: 'plen', type: 'number' }
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
        labelWidth: 45
    }
}

// Component
//
export default {
    data,
    template,
    computed: {
        editingAttributes() {
            return this.store.editingAttributes
        }
    }
}