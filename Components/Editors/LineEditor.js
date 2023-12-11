// LineEditor.js


// Imports
//
import { useEditorStore } from 'stores/editor'
import { renderGroups } from 'editors/types'

// Attributes for Template
//
let attributeGroups = {
    title: 'Line Editor',
    groups: [
        [
            { name: 'x1', title: 'x1', type: 'number' },
            { name: 'y1', title: 'y1', type: 'number' }
        ],
        [
            { name: 'x2', title: 'x2', type: 'number' },
            { name: 'y2', title: 'y2', type: 'number' }
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