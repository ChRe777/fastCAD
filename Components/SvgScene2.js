// scene.js
//

// Imports
//
import { useStore } from 'stores/store'
import { useViewStore } from 'stores/view'
import { useSelectionStore } from 'stores/selection'
import { svgTypesVue, renderLayerAttributes } from './types2.js'

import api from 'scripts/api'
import selectionFrame from './selection2.js';


// Template
//
const layerAttrs = renderLayerAttributes()

const template = `
<svg id="svg" ref="svg" :viewBox="viewBox">
   <selectionFrame></selectionFrame>
   <template v-for="layer in store.scene.layers">
      <g ${layerAttrs}>
         <template v-for="layer in layer.layers">
            <g ${layerAttrs}>
                <template v-for="element in layer.elements">
                 ${svgTypesVue}
                </template>
            </g>
         </template>
         <template v-for="element in layer.elements">
         ${svgTypesVue}
         </template>
      </g>
   </template>
</svg>
`

// Data
//
function data() {
    return {
        store: useStore(),
        selectionStore: useSelectionStore(),
        viewStore: useViewStore(),
        //
        isShiftPressed: false
    }
}

// On Drag Scene
//
function createDragger(self) {

    let svg = self.$refs.svg

    window.addEventListener('keydown', (event) => {
        //console.log('keydown', event.shiftKey)
        if (event.key === 'Shift') {
            self.isShiftPressed = true
        }
    })

    window.addEventListener('keyup', (event) => {
        //console.log('keyup', event.shiftKey, event)
        if (event.key === 'Shift') {
            self.isShiftPressed = false
            console.log('self.isShiftPressed', self.isShiftPressed)
        }
    })

    return new Gesto(svg).on('drag', e => {

        // console.log("shift pressed:", self.isShiftPressed)
        if (self.isShiftPressed) {
            return
        }

        let zoomFactor = self.viewStore.zoomFactor

        scrollX -= (e.deltaX / zoomFactor)
        self.viewStore.scrollX = scrollX

        scrollY -= (e.deltaY / zoomFactor)
        self.viewStore.scrollY = scrollY

    });

}

// On Resize SVG area
//
function createResizeObserver(self) {
    let svg = self.$refs.svg

    function outputsize() {
        self.viewStore.width = svg.clientWidth
        self.viewStore.height = svg.clientHeight
    }

    new ResizeObserver(outputsize).observe(svg)
}

function isSelected(element) {
    return this.selectionStore.selectedElements.find((el) => el.id === element.id) !== undefined
}

function selectElement(element) {
    console.log("select", this.selectionStore)
    // Deselect
    if (this.selectionStore.selectedElements.find((el) => el.id === element.id) !== undefined) {
        api.deselect(element)
    } else {
        api.select(element)
    }
}

// Mounted
//
function mounted() {
    createDragger(this)
    createResizeObserver(this)
}

function viewBox() {
    let [x, y, w, h] = this.viewStore.viewBox
    return `${x} ${y} ${w} ${h}`
}

// Component
//
export default {
    data,
    template,
    computed: {
        viewBox
    },
    methods: {
        selectElement,
        isSelected
    },
    components: {
        selectionFrame
    },
    mounted
}
