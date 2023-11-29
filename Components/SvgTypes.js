// Imports
//
import mustache from 'wontache';


// Constants
//
const fill = [
    "fill",
    "fill-opacity"
]

const stroke = [
    "stroke",
    "stroke-width",
    "stroke-dasharray"
]

/*
Presentation Attributes
Most notably: clip-path, clip-rule, color, color-interpolation, color-rendering, cursor, display, fill, fill-opacity, fill-rule, filter, mask, opacity, pointer-events, shape-rendering, stroke, stroke-dasharray, stroke-dashoffset, stroke-linecap, stroke-linejoin, stroke-miterlimit, stroke-opacity, stroke-width, transform, vector-effect, visibility
*/

const svgTypes = {
    types: [
        {
            type: "circle",
            attrs: ["cx", "cy", "r"]
                .concat(fill).concat(stroke)
        },
        {
            type: "line",
            attrs: ["x1", "y1", "x2", "y2"]
                .concat(stroke)
        },
        {
            type: "text",
            attrs: ["x", "y", "font-family", "font-size", "textLength", "rotate"]
                .concat(fill).concat(stroke),
            childAttr: "text"
        },
        {
            type: "image",
            attrs: ["x", "y", "width", "height", "href"],
        },
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
        {
            type: "polyline",
            attrs: ["points", "pathLength"]
                .concat(fill).concat(stroke)
        },
        // https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon
        {
            type: "polygon",
            attrs: ["points", "pathLength"]
                .concat(fill).concat(stroke)
        },
        {
            type: "path",
            attrs: ["d", "pathLength"]
                .concat(fill).concat(stroke)
        }
    ]
}

const layerType = {
    type: "layer",
    attrs: ["style"]
        .concat(fill).concat(stroke)
}

const typesTemplate = `
{{#types}}
    <{{#type}}{{.}}{{/type}}
        {{#isFirst}} v-if="element.type === '{{#type}}{{.}}{{/type}}'"{{/isFirst}}
        {{#isNotFirst}} v-else-if="element.type === '{{#type}}{{.}}{{/type}}'"{{/isNotFirst}}
        :class="{ selected: isSelected(element)}" 
        @click="selectElement(element)" 
        :id="element.id"
        {{#attrs}}
        :{{.}}="element['{{.}}']"
        {{/attrs}}
    >
    {{=<% %>=}}
    <%#childAttr%>{{element['<%.%>']}}<%/childAttr%>
    <%={{ }}=%>
    </{{#type}}{{.}}{{/type}}>
{{/types}}
`

const attrsTemp = `
:id="layer.id"
{{#attrs}}
    :{{.}}="layer['{{.}}']"
{{/attrs}}`


export function renderLayerAttributes() {
    let t = layerType
    return renderTypeAttributes_(t)
}

function renderTypeAttributes_(type) {
    const renderFn = mustache(attrsTemp)
    const template = renderFn(type)
    return template
}

function renderTypes(types) {
    const renderFn = mustache(typesTemplate)
    const template = renderFn(types)
    return template
}

svgTypes.types = svgTypes.types.map((item, index) => {
    return {
        ...item,
        isFirst: index === 0,
        isNotFirst: index !== 0, // Add flag for items other than the first
    }
})

//console.log(svgTypes)

export const svgTypesVue = renderTypes(svgTypes)