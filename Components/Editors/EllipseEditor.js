// CircleEdtior.js

// Imports
//
import { useEditorStore } from 'stores/editor'
import { renderGroups } from 'editors/types'

// Attributes for Template
//
let attributeGroups = {
    title: 'Ellipse Editor',
    groups: [
        [
            { name: 'cx', title: 'cx', type: 'number' },
            { name: 'cy', title: 'cy', type: 'number' }
        ],
        [
            { name: 'rx', title: 'rx', type: 'number' },
            { name: 'ry', title: 'ry', type: 'number' },
        ],
        [
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