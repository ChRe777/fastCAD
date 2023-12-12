// SvgSelectionRect.js

// Imports
//

// Template
//
const template = `
<rect id="selectionRect" ref="selectionRect" 
    :x="bb.x" :y="bb.y" :width="bb.width" :height="bb.height" 
    stroke="#316bf3" stroke-width="2"  stroke-dasharray="4" fill="None" />
`

// Get bounding box of svg element
//
function getBB(element) {
    let id = element.id
    let el = document.getElementById(id)
    return el.getBBox()
}

// Component
//
export default {
    data() {
        return {
            bb: {
                x: 0, y: 0,
                width: 0, height: 0
            }
        }
    },
    props: ['element'],
    template,
    watch: {
        'element': {
            handler() {
                // update bb if element changes
                this.bb = getBB(this.element)
            },
            deep: true
        }
    },
    mounted() {
        this.bb = getBB(this.element)
    }
}