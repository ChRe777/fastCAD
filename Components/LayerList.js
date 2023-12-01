// layer.js

// Imports
//
import api from 'api/api'
//
import { useStore } from 'stores/store'

// Parts
//
import LayerListChilds from 'parts/childs'
import LayerListToggler from 'parts/toggler'
import LayerListVisible from 'parts/visible'

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
            <layer-list-toggler :id="layer.id" :active="isCurrent(layer)" :level="level(layer)" />
            {{layer.name}}
        </span>

        <span>
            <layer-list-childs  :id="layer.id" :active="isCurrent(layer)" />
            <layer-list-visible :id="layer.id" :active="isCurrent(layer)" :visible="isVisible(layer)" />
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

// Fill layers_
//
function fillLayers_(layers, layers_, levels_, level) {
    for (const layer of layers) {

        layers_.push(layer)
        levels_[layer.id] = level

        if (layer.layers && layer['layers-open']) {
            fillLayers_(layer.layers, layers_, levels_, level + 1)
        }
    }
}

// Data
//
function data() {
    return {
        store: useStore(),
        levels: {},
        hover: {}
    }
}

// Components
//
export default {
    data,
    template,
    components: {
        LayerListChilds,
        LayerListVisible,
        LayerListToggler,
    },
    computed: {
        layers() {
            let layers_ = []
            fillLayers_(this.store.scene.layers, layers_, this.levels, 0)
            return layers_
        }
    },
    methods: {
        layerClass,
        level(layer) {
            return this.levels[layer.id]
        },
        isCurrent(layer) {
            return api.layer.isCurrent(layer)
        },
        isVisible(layer) {
            return (layer.style.indexOf('visible') >= 0)
        },
        setCurrent(layer) {
            api.layer.setCurrent(layer)
        }
    }
}