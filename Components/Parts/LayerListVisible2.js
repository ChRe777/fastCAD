// visible.js

// Imports
//
import api from 'scripts/api'

// Template
//
const template = `
<span :id="id" :class="badgeClass" @click.prevent.stop="toogleVisibility()">
    <i class="user-select-none" :class="iconClass"></i>
</span>
`

// toogle visibility of layer
// 
function toogleVisibility() {
    const layer = api.getLayerById(this.id)

    if (layer.style.indexOf('visible') >= 0) {
        api.modify(layer, 'layer', { style: 'visibility:hidden' })
    } else {
        api.modify(layer, 'layer', { style: 'visibility:visible' })
    }

}

// Icon
//
function iconClass() {
    let classes = 'user-select-none'
    classes += ' ' + (this.visible ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill')
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
    props: ['id', 'active', 'visible'],
    template,
    computed: {
        iconClass,
        badgeClass
    },
    methods: {
        toogleVisibility
    }
}