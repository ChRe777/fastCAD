// RectEditor.js

// Imports
//
import { useEditorStore } from 'stores/editor'
import { renderGroups } from 'editors/types'

// Attributes for Template
//
let attributeGroups = {
    title: 'Rect Editor',
    groups: [
        [
            { name: 'x', title: 'x', type: 'number' },
            { name: 'y', title: 'y', type: 'number' }
        ],
        [
            { name: 'width', title: 'w', type: 'number' },
            { name: 'height', title: 'h', type: 'number' }
        ]
    ]
}

// Template
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