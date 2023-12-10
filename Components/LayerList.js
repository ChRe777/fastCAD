// layer.js

// Imports
//
import api from 'api/api'
//
import { useStore } from 'stores/store'

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

// Fill layers_
//
function fillLayers_(elements, layers_, levels_, level) {

    console.log("fillLayers", elements)
    if (elements === undefined) {
        return
    }

    for (const element of elements) {

        if (element.type === "layer") {
            let layer = element

            layers_.push(layer)
            levels_[layer.id] = level

            if (layer['isopen']) {
                fillLayers_(layer.elements, layers_, levels_, level + 1)
            }
        }
    }
}

function level(layer) {
    return this.levels[layer.id]
}

function isCurrent(layer) {
    return api.layer.isCurrent(layer)
}

function isVisible(layer) {
    return api.layer.isVisible(layer)
}

function isFrozen(layer) {
    return api.layer.isFrozen(layer)
}

function setCurrent(layer) {
    api.layer.setCurrent(layer)
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
        LayerListCounter,
        LayerListToggler,
        LayerListVisible,
        LayerListFreeze,
    },
    computed: {
        layers() {
            let layers_ = []
            // TODO: API?
            console.log(this.store.scene.elements)
            fillLayers_(this.store.scene.elements, layers_, this.levels, 0)
            console.log("layers_", layers_)
            return layers_
        }
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