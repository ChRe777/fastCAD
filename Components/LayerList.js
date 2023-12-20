// layer.js

// Imports
//
import api from 'api/internal'

// Parts
//
import LayerListCounter from 'parts/counter'
import LayerListToggler from 'parts/toggler'
import LayerListVisible from 'parts/visible'
import LayerListFreeze from 'parts/freeze'

// Template
//
const template = `
<ul class="list-group rounded-1 bg-primary text-white">

    <li :id="layer.id" 
        
        :class="layerClass(layer)" 
        style="padding-left: 8px !important; padding-right: 8px !important;"
        
        @click.prevent.stop="setCurrent(layer)"

        @mouseover="hover[layer.id] = true"
        @mouseleave="hover[layer.id] = false"

        v-for="layer in layers"
    >

        <span class="text-truncate" style="max-width: 120px;">
            <layer-list-toggler :layer="layer" :active="isCurrent(layer)" :level="level(layer)" />
            {{layer.name}}
        </span>

        <span class="badge-group">
            <layer-list-counter class="me-1" :layer="layer" :active="isCurrent(layer)" />
            <layer-list-visible class="me-1" :layer="layer" :active="isCurrent(layer)" :visible="isVisible(layer)" />
            <layer-list-freeze  :layer="layer" :active="isCurrent(layer)" :frozen="isFrozen(layer)" />
        </span>

    </li>
</ul>
`

// Layer class
//
function layerClass(layer) {
    let classes = 'list-group-item d-flex justify-content-between align-items-center'
    classes += ' ' + (this.isCurrent(layer) ? 'active' : '')
    classes += ' ' + (this.hover[layer.id] ? 'text-decoration-underline' : '')
    return classes
}

// Methods
//
function level(layer) {
    return this.levels[layer.id]
}

function isCurrent(layer) {
    return api.selection.isCurrentLayer(layer)
}

function isVisible(layer) {
    return api.layer.isVisible(layer)
}

function isFrozen(layer) {
    return api.layer.isFrozen(layer)
}

function setCurrent(layer) {
    api.selection.setCurrentLayer(layer)
}

// Computed
// 
function layers() {
    let layers_ = []

    api.layer.forEach((layer, parent, level) => {
        layers_.push(layer)
        this.levels[layer.id] = level
        this.parents[layer.id] = parent
        return layer['isopen']
    })

    return layers_
}

// Data
//
function data() {
    return {
        levels: {},
        parents: {},
        hover: {}
    }
}


// Exports 
//
export default {
    data,
    template,
    components: {
        LayerListCounter,
        LayerListToggler,
        LayerListVisible,
        LayerListFreeze,
    },
    computed: {
        layers
    },
    methods: {
        layerClass,
        level,
        isCurrent,
        isVisible,
        isFrozen,
        setCurrent
    }
}
