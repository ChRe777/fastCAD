// childs.js

// Imports
//
import api from 'services/api'

// Template
//
const template = `
<span :id="id" :class="badgeClass" @click.prevent.stop="">
    {{childsCount}}
</span>
`

// Get number of child layers
//


function badgeClass() {
    let classes = 'badge bg-primary rounded-pill me-1'
    classes += ' ' + (this.active ? 'bg-white text-primary' : 'bg-primary text-white')
    return classes
}

function childsCount() {
    const layer = api.getLayerById(this.id)
    return api.numLayerChilds(layer)
}

// Component
//
export default {
    props: ['id', 'active'],
    template,
    computed: {
        badgeClass,
        childsCount
    }
}
