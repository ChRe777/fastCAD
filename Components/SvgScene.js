// scene.js
//

// Docs
//
// see https://michaelnthiessen.com/force-re-render

// Imports
//
import api from 'api/api'
import SvgSelectionRect from 'components/selectionRect'
import { useSelectionStore } from 'stores/selection';

// Template
//
const template = `
<svg id="svg" ref="svg" :viewBox="viewBox" :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
    <svg-element v-for="element in elements" :element="element" :parent="undefined"></svg-element>
    <g id="toolLayer" style="z-index:99999"></g>
    <g id="selectionLayer" style="z-index:999999">
        <svg-selection-rect v-for="element in selectedElements" :element="element"></svg-selection-rect>
    </g>
</svg>
`

// Data
//
function data() {
    return {
        selectionStore: useSelectionStore(),
        selectedElements: []
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

//function selectedElements() {
//    return api.selection.elements()
//}

const onSelectedElements = {
    handler() {
        console.log("SVG Scene onSelectedElements")
        //let count = this.selectionStore.selectedElementsSet.length
        //this.selectedElements = new Array(count)
        let arr = [...this.selectionStore.selectedElementsSet]
        this.selectedElements = arr
    },
    deep: true
}

// Component
//
export default {
    data,
    template,
    computed: {
        viewBox,
        elements,
        //selectedElements,
    },
    watch: {
        'selectionStore.selectedElementsSet': onSelectedElements
    },
    components: {
        SvgSelectionRect
    },
    mounted
}
