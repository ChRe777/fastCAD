// toogler.js

// Imports
//
import api from 'services/api'

// Template
//
const template = `
<i :id="id" :class="iconClass" @click.prevent.stop="toogleOpen"></i> 
`

function toogleOpen() {
    const layer = api.getLayerById(this.id)
    if (layer.layers != undefined) {
        layer['layers-open'] = !layer['layers-open']
    }
}

// Component
//
export default {
    props: ['id', 'active', 'level'],
    template,
    methods: {
        toogleOpen,
        hasChilds(layer) {
            return layer.layers != undefined && layer.layers.length > 0
        },
        isOpen(layer) {
            return this.hasChilds(layer) && layer['layers-open']
        },
    },
    computed: {
        iconClass() {
            const layer = api.getLayerById(this.id)

            let i = `ps-${this.level * 2} `

            if (this.hasChilds(layer)) {
                if (this.isOpen(layer)) {
                    return i + 'bi bi-caret-down-fill'
                } else {
                    return i + 'bi bi-caret-right-fill'
                }
            } else {
                if (this.level == 1) {
                    return i + 'bi bi-arrow-return-right opacity-25'
                }
                return i + 'bi bi-caret-right opacity-25'
            }
        }
    }
}