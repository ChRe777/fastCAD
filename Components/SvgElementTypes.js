// Imports
//

// Constants
//

const general = [
    "id",
    "visibility"
]

const fill = [
    "fill",
    "fill-opacity"
]

const stroke = [
    "stroke",
    "stroke-width",
    "stroke-dasharray",
    "stroke-opacity"
]

/*
Presentation Attributes
Most notably: clip-path, clip-rule, color, color-interpolation, color-rendering, cursor, display, fill, fill-opacity, fill-rule, filter, mask, opacity, pointer-events, shape-rendering, stroke, stroke-dasharray, stroke-dashoffset, stroke-linecap, stroke-linejoin, stroke-miterlimit, stroke-opacity, stroke-width, transform, vector-effect, visibility
*/

// For Blocks
// see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use
// see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol
// see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs

// For "Schaffur"
// see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern

// Perhaps for DetailView
// https://developer.mozilla.org/en-US/docs/Web/SVG/Element/view

// For Path
// see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path

// For Mask
// see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mask
// see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath

// For "Bemassung/Pfeile"
// see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker

const svgLayerChild = `
    <svg-element v-for="child in element.elements" :element="child" :parent="element"></svg-element>
`

const svgGroupChild = `
    <svg-element v-for="child in element.elements" :element="child" :parent="element"></svg-element>
`
const svgTypes = {
    types: [
        {
            type: "layer",
            "svg-type": "g",
            attrs: []
                .concat(general).concat(fill).concat(stroke),
            childElements: [svgLayerChild]
        },
        {
            type: "g",
            attrs: []
                .concat(general).concat(fill).concat(stroke),
            childElements: [svgGroupChild]
        },
        {
            type: "circle",
            attrs: ["cx", "cy", "r"]
                .concat(general).concat(fill).concat(stroke)
        },
        {
            type: "ellipse",
            attrs: ["cx", "cy", "rx", "ry"]
                .concat(general).concat(fill).concat(stroke)
        },
        {
            type: "rect",
            attrs: ["x", "y", "width", "height", "rx", "ry"]
                .concat(general).concat(fill).concat(stroke)
        },
        {
            type: "line",
            attrs: ["x1", "y1", "x2", "y2"]
                .concat(general).concat(stroke)
        },
        {
            type: "text",
            attrs: ["x", "y", "font-family", "font-size", "textLength", "rotate", "word-spacing"]
                .concat(general).concat(fill).concat(stroke),
            childAttr: "text"
        },
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath
        {
            type: "image",
            attrs: ["x", "y", "width", "height", "href"]
                .concat(general)
        },
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
        {
            type: "polyline",
            attrs: ["points", "pathLength"]
                .concat(general).concat(fill).concat(stroke)
        },
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon
        {
            type: "polygon",
            attrs: ["points", "pathLength"]
                .concat(general).concat(fill).concat(stroke)
        },
        {
            type: "path",
            attrs: ["d", "pathLength"]
                .concat(general).concat(fill).concat(stroke)
        }
    ]
}

const svgLayerType = {
    type: "layer",
    attrs: []
        .concat(general).concat(fill).concat(stroke)
}

function renderAttribute(attr) {
    return `:${attr}="element['${attr}']"` // :cx="element['cx']"
}

function renderAttributes(attrs) {
    return attrs.map(renderAttribute).join(" ")
}

function renderType(element, index) {
    let cond = "v-else-if"
    if (index == 0) {
        cond = "v-if"
    }

    let child = ""
    if (element.childAttr) {
        child = `{{element.${element.childAttr}}}`
    }

    let childElements = ""
    if (element.childElements) {
        childElements = element.childElements.join("\n")
    }

    let type = element.type
    if ('svg-type' in element) {
        type = element['svg-type']
    }

    let selection = `
    :class="{ selected: isSelected(element)}" 
    @click="selectElement(element, parent)"
    `

    if (element.type === 'layer') {
        selection = ""
    }

    return `
    <${type}
        ${cond}="element.type === '${element.type}'"
        ${selection}
        data-type="${element.type}" 
        ${renderAttributes(element.attrs)}
    >
    ${child}
    ${childElements}
    </${type}>`
}

function renderTypes(types) {
    return types.map(renderType).join("\n")
}

export const svgElementTypes = renderTypes(svgTypes.types)
export const svgLayerAttributes = renderAttributes(svgLayerType.attrs)
