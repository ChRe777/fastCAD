// toogler.js

// Imports
//
import api from 'api/api'

// Template
//
const template = `
<i :id="id" :class="iconClass" @click.prevent.stop="toogleOpen"></i> 
`

function getCarret(layer, level) {
    let i = `ps-${level * 2} `
    if (api.layer.isOpen(layer)) {
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
            const layer = api.layer.getById(this.id)
            api.layer.toogleOpen(layer)
        },
    },
    computed: {
        iconClass() {
            const layer = api.layer.getById(this.id)
            if (api.layer.hasChilds(layer, this.level)) {
                return getCarret(layer)
            } else {
                return getCarretNoChilds(this.level)
            }
        }
    }
}