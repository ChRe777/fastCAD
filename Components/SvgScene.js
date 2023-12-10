// scene.js
//

// Imports
//
import api from 'api/api'
import selectionFrame from 'components/selection';

// Template
//
const template = `
<svg id="svg" ref="svg" :viewBox="viewBox" :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
    <svg-element v-for="element in elements" :element="element" :parent="undefined"></svg-element>
    <g id="toolLayer" style="z-index:9999"></g>
</svg>
`

// Data
//
function data() {
    return {
    }
}

// On Resize SVG area
//
function createResizeObserver(self) {
    let svg = self.$refs.svg

    function outputsize() {
        api.view.setSize(svg.clientWidth, svg.clientHeight)
    }

    new ResizeObserver(outputsize).observe(svg)
}

// Mounted
//
function mounted() {
    // TODO: Refactor
    createResizeObserver(this)
}

// Computed
//
function viewBox() {
    let [x, y, w, h] = api.view.viewBox()
    return `${x} ${y} ${w} ${h}`
}

function elements() {
    return api.scene.elements()
}

// Component
//
export default {
    data,
    template,
    computed: {
        viewBox,
        elements
    },
    components: {
        selectionFrame,
    },
    mounted
}
