// visible.js

// Imports
//
import api from 'api/api'

// Template
//
const template = `
<span :class="badgeClass" @click.prevent.stop="toogleFreezing()">
    <i class="user-select-none" :class="iconClass"></i>
</span>
`

// toogle freezing of layer
// 
function toogleFreezing() {
    api.layer.toogleFreezing(this.layer)
}

// Icon
//
function iconClass() {
    let classes = 'user-select-none'
    classes += ' ' + (this.frozen ? 'bi bi-snow' : 'bi bi-droplet-fill')
    return classes
}

// Badge and background
//
function badgeClass() {
    let classes = 'badge rounded-pill'
    classes += ' ' + (this.active ? 'bg-white text-primary' : 'bg-primary text-white')
    return classes
}

// Component
//
export default {
    props: ['layer', 'active', 'frozen'],
    template,
    computed: {
        iconClass,
        badgeClass
    },
    methods: {
        toogleFreezing
    }
}