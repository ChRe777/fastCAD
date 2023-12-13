// SvgSelectionRect.js

// Show the bounding box rectangle of an svg element,
// if the object is selected

// Constants
//
const stroke_color = "#316bf3"
const stroke_width = 2
const stroke_dasharrray = "5"

// Template
//
const template = `
<rect :x="bb.x" :y="bb.y" 
    :width="bb.width" :height="bb.height" 
    stroke="${stroke_color}" 
    stroke-width="${stroke_width}"  
    stroke-dasharray="${stroke_dasharrray}" 
    fill="None" />
`

// Add stroke width to bounding box because, 
// getBBox({stroke:true}) does not work!!
//
function addStroke(element, bb) {
    if (!isNaN(element["stroke-width"])) {
        let sw = element["stroke-width"]
        bb.x -= sw / 2
        bb.y -= sw / 2
        bb.height += sw
        bb.width += sw
    }
    return bb
}

// Get bounding box of svg element
//
function getBB(element) {
    console.log("getBB - element.id", element.id)
    let svgElement = document.getElementById(element.id)
    // Does not work??
    // let options = { stroke: true, fill: true, markers: true }
    let bb = svgElement.getBBox()
    return addStroke(element, bb)
}

function data() {
    return {
        bb: {
            x: 0, y: 0,
            width: 0, height: 0
        }
    }
}

// Component
//
export default {
    data,
    props: ['element'],
    template,
    watch: {
        'element': {
            handler() {
                this.bb = getBB(this.element)
            },
            deep: true // check if some properties (e.g. pos x or width) change in element
        }
    },
    mounted() {
        this.bb = getBB(this.element)
    }
}