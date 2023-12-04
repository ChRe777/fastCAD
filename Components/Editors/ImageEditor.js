// Image.js

// Imports
//
import { useEditorStore } from 'stores/editor'
import { renderGroups } from 'editors/types'

// Attributes for Template
//
let attributeGroups = {
    title: 'Image Editor',
    groups: [
        [
            { name: 'x', title: 'x', type: 'number' },
            { name: 'y', title: 'y', type: 'number' }
        ],
        [
            { name: 'width', title: 'w', type: 'length' },
            { name: 'height', title: 'h', type: 'length' }
        ],
        [
            { name: 'href', title: 'href', type: 'url' },
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

// Components
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