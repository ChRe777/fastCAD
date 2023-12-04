// scene.js
//

// Imports
//
import { useStore } from 'stores/store'
import { useViewStore } from 'stores/view'
//import { svgTypesVue, renderLayerAttributes } from 'components/types'

import api from 'api/api'
import selectionFrame from 'components/selection';

// Template
//
//const layerAttrs = renderLayerAttributes()

// TODO: LAYERS ARE GROUPS SO PUT THEMM INTO ELEMENTS

/*
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

const templateNEW = `
<svg id="svg" ref="svg" :viewBox="viewBox">
   <selectionFrame></selectionFrame>
   <template v-for="element in store.scene.elements">
        ${svgTypesVue}
        <template v-for="element in element.elements">
            ${svgTypesVue}
            <template v-for="element in element.elements">
                 ${svgTypesVue}
                </template>
         </template>
   </template>
</svg>`
*/

const template = `
<svg id="svg" ref="svg" :viewBox="viewBox" :width="width" :height="height">
    <selectionFrame></selectionFrame>
    <template v-for="element in elements">
        <svg-element :element="element"></svg-element>
    </template>
</svg>
`


// Data
//
function data() {
    return {
        store: useStore(),
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

        // TODO: USE VIEW API
        let zoomFactor = self.viewStore.zoomFactor

        // TODO: USE VIEW API
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

// Mounted
//
function mounted() {
    // TODO: Refactor
    createDragger(this)
    createResizeObserver(this)
}

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
        //svgElement - register global in app to work recursively
    },
    mounted
}
