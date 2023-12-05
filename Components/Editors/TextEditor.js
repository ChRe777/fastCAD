// text.js

import { useEditorStore } from 'stores/editor'
import { useSettingsStore } from 'stores/settings'
import { renderGroups } from 'editors/types'

// Template
//
let attributeGroups = {
    title: 'Text Editor',
    groups: [
        [
            { name: 'x', title: 'x', type: 'number' },
            { name: 'y', title: 'y', type: 'number' }
        ],
        [
            { name: 'text', title: 'text', type: 'long-text' },
        ],
        [
            { name: 'textLength', title: 'len', type: 'number' },
            { name: 'rotate', title: 'rot', type: 'angle' }
        ],
        [
            { name: 'word-spacing', title: 'ws', type: 'number' },
        ],
        [
            { name: 'font-family', title: 'font', type: 'font' },
        ],
        [
            { name: 'font-size', title: 'size', type: 'length' }, // https://developer.mozilla.org/en-US/docs/Web/CSS/length
        ]
    ]
}

const template = renderGroups(attributeGroups)

// Data
//
function data() {
    let settings = useSettingsStore()

    return {
        editorStore: useEditorStore(),
        labelWidth: 45,
        fonts: settings.fonts
    }
}

// Component
//
export default {
    data,
    template,
    computed: {
        editingAttributes() {
            return this.editorStore.editingAttributes
        }
    }
}