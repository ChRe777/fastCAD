// toogler.js

// Imports
//
import api from 'services/api'

// Template
//
const template = `
<i :id="id" :class="iconClass" @click.prevent.stop="toogleOpen"></i> 
`

function getCarret(layer, level) {
    let i = `ps-${level * 2} `
    if (api.isLayerOpen(layer)) {
        return i + 'bi bi-caret-down-fill'
    } 
    return i + 'bi bi-caret-right-fill'
}

function getCarretNoChilds(level) {
    let i = `ps-${level * 2} `
    if (level == 1) {
        return i + 'bi bi-arrow-return-right opacity-25'
    }
    return i + 'bi bi-caret-right opacity-25'
}

// Component
//
export default {
    props: ['id', 'active', 'level'],
    template,
    methods: {
        toogleOpen() {
            const layer = api.getLayerById(this.id)
            api.toogleLayerOpen(layer)
        },
    },
    computed: {
        iconClass() {
            console.log("layerId:", this.id)
            const layer = api.getLayerById(this.id)
            if (api.hasLayerChilds(layer, this.level)) {
                return getCarret(layer)
            } else {
                return getCarretNoChilds(this.level)
            }
        }
    }
}