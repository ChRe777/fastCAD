// childs.js

// Imports
//
import api from 'api/internal'

// Template
//
const template = `
<span :class="badgeClass" @click.prevent.stop="">
    {{elementsCount}}
</span>
`

// Get number of child layers
//


function badgeClass() {
    let classes = 'badge bg-primary rounded-pill'
    classes += ' ' + (this.active ? 'bg-white text-primary' : 'bg-primary text-white')
    return classes
}

function elementsCount() {
    return api.layer.getElementsCount(this.layer)
}

// Component
//
export default {
    props: ['layer', 'active'],
    template,
    computed: {
        badgeClass,
        elementsCount
    }
}
