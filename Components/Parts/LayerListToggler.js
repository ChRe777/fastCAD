// toogler.js

// Imports
//
import api from 'api/internal'

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
    props: ['layer', 'active', 'level'],
    template,
    methods: {
        toogleOpen() {
            api.layer.toogleOpen(this.layer)
        },
    },
    computed: {
        iconClass() {
            if (api.layer.hasChilds(this.layer, this.level)) {
                return getCarret(this.layer)
            } else {
                return getCarretNoChilds(this.level)
            }
        }
    }
}