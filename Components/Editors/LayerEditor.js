// LayerEditor.js

// Imports
//
import { useStore } from 'stores/store'
import { useEditorStore } from 'stores/editor'
import { useSettingsStore } from 'stores/settings'
import { renderGroups } from 'editors/types'

// Template
//
let attributeGroups = {
    title: 'Layer Editor',
    groups: [
        [
            { name: 'name', title: 'name', type: 'text' }
        ],
        [
            { name: 'description', title: 'desc', type: 'long-text' }
        ],
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

const template = renderGroups(attributeGroups)

// Data
//
function data() {
    let settingsStore = useSettingsStore()

    return {
        store: useStore(),
        editorStore: useEditorStore(),
        labelWidth: 45,
        fonts: settingsStore.fonts
    }
}

// Component
//
export default {
    data,
    template,
    computed: {
        editingAttributes() {
            return this.editorStore.layerEditingAttributes
        }
    }
}