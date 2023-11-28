// childs.js

// Imports
//
import api from 'scripts/api'

// Template
//
const template = `
<span :id="id" :class="badgeClass" @click.prevent.stop="">
    {{childsCount}}
</span>
`

// Get number of child layers
//
function getNumChilds(layer) {

    let childs = layer.elements.length

    if (layer.layers != undefined) {
        return childs + layer.layers
            .map(getNumChilds)
            .reduce((accumulator, currentValue) => {
                return accumulator + currentValue
            }, 0);
    }

    return childs
}

function badgeClass() {
    let classes = 'badge bg-primary rounded-pill me-1'
    classes += ' ' + (this.active ? 'bg-white text-primary' : 'bg-primary text-white')
    return classes
}

function childsCount() {
    const layer = api.getLayerById(this.id)
    return getNumChilds(layer)
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
