// circle.js

// Imports
//
import { useEditorStore } from 'stores/editor'
import { renderGroups } from './AttributeTypes2.js'

// Attributes for Template
//
let attributeGroups = {
    title: 'Circle Editor',
    groups: [
        [
            { name: 'cx', title: 'cx', type: 'number' },
            { name: 'cy', title: 'cy', type: 'number' }
        ],
        [
            { name: 'r', title: 'r', type: 'number' },
            { name: 'pathLength', title: 'plen', type: 'number' },
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