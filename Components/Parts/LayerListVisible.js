// visible.js

// Imports
//
import api from 'api/api'

// Template
//
const template = `
<span :class="badgeClass" @click.prevent.stop="toogleVisibility()">
    <i class="user-select-none" :class="iconClass"></i>
</span>
`

// toogle visibility of layer
// 
function toogleVisibility() {
    api.layer.toogleVisibility(this.layer)
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
    props: ['layer', 'active', 'visible'],
    template,
    computed: {
        iconClass,
        badgeClass
    },
    methods: {
        toogleVisibility
    }
}