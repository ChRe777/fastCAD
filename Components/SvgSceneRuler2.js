// ruler.js
//

// Imports
//
import { useViewStore } from 'stores/view';

// Template
//
const template = `
<div class="ruler" ref="ruler"></div>
`

// Zoom Steps
//
const n = 20 // ZoomStufen -19 .. +19
const pos = [...Array(n).keys()]
pos[0] = 50
pos.forEach((_, index, arr) => {
    if (index > 0) {
        let n = index % 4
        let m = 1
        if (n === 0) m = 2
        if (n === 1) m = 1
        if (n === 2) m = 5
        if (n === 3) m = 1
        arr[index] = arr[index - 1] / m
    }
})

const neg = [...Array(n).keys()]
neg[0] = 100
neg.forEach((_, index, arr) => {
    if (index > 0) {
        let n = index % 4
        let m = 1
        if (n === 0) m = 2
        if (n === 1) m = 1
        if (n === 2) m = 5
        if (n === 3) m = 1
        arr[index] = arr[index - 1] * m
    }
})


// Functions
//
function createDragger(self) {
    let parent = self.$refs.ruler

    return new Gesto(parent).on('drag', e => {

        let zoomFactor = self.viewStore.zoomFactor

        if (self.type === 'horizontal') {
            scrollX -= (e.deltaX / zoomFactor)
            self.viewStore.scrollX = scrollX

        } else if (self.type === 'vertical') {
            scrollY -= (e.deltaY / zoomFactor)
            self.viewStore.scrollY = scrollY
        }

    });

}

function createRuler(self) {
    let container = self.$refs.ruler
    return new Ruler(container, { type: self.type })
}

// Data
//
function data() {
    return {
        viewStore: useViewStore(),
        ruler: null,
        dragger: null
    }
}

// Mounted
//
function mounted() {
    this.ruler = createRuler(this)
    this.dragger = createDragger(this)
}

// Component
//
export default {
    props: ['type'],
    data,
    template,
    watch: {
        'viewStore.viewBox': {
            handler: function (newViewBox) {
                let [x, y] = newViewBox
                if (this.type == "horizontal") {
                    this.ruler.scroll(x)
                }
                if (this.type == "vertical") {
                    this.ruler.scroll(y)
                }
                this.ruler.resize()
            }
        },
        'viewStore.width': {
            handler: function () {
                this.ruler.resize()
            }
        },
        'viewStore.height': {
            handler: function () {
                this.ruler.resize()
            }
        },
        'viewStore.zoomFactor': {
            handler: function (newZoomFactor) {

                let unit = 50

                if (newZoomFactor >= 1) {
                    let zoomStep = Math.log2(newZoomFactor)
                    unit = pos[zoomStep]
                    console.log("pos", newZoomFactor, " -> ", zoomStep, "unit", unit)
                } else {
                    let zoomStep = -Math.log2(newZoomFactor)
                    unit = neg[zoomStep]
                    console.log("neg", newZoomFactor, " -> ", zoomStep, "unit", unit)
                }

                this.ruler.unit = unit
                this.ruler.zoom = newZoomFactor
            }
        },
    },
    mounted
}