// store.js
//

// Imports
//
import { defineStore } from 'pinia'

// Example Scene Layer 0
//
const layer0 = {
    "type": "layer",
    "svg-type": "g",
    "visibility": "visible",
    "id": "layer-Laltl3Tj123",
    "name": "poly...",
    "isopen": false,
    "description": "Polyline layer description long",
    "fill": "#00ff00",
    "stroke": "#ffffff",
    "stroke-width": "2",
    "stroke-opacity": "1.0",
    "elements": [
        {
            "type": "polyline",
            "id": "polyline-Pltl3Tj575",
            "points": "200,160 200,260 300,260 300,160",
            "fill-opacity": 0,
            "stroke-dasharray": "5",
            "pathLength": 105
        },
        {
            "type": "path",
            "id": "path-Pathl3Tj575",
            "d": "M 225 150\n h 50 v50 h-50\nv 50 h50",
            "fill-opacity": 0,
            "stroke-dasharray": "5",
            "stroke-width": 5,
            "pathLength": 105,
            "stroke": "#00f900"
        }
    ]
}

const layer1 = {
    "type": "layer",
    "svg-type": "g",
    "isfrozen": false,
    "visibility": "visible",
    "id": "layer-aLhhtl3Tj585",
    "isopen": false,
    "name": "images",
    "description": "Image layer description long",
    "fill": "#ffffff",
    "stroke": "#ffffff",
    "stroke-width": "2",
    "stroke-opacity": "1.0",
    "elements": [
        {
            "type": "image",
            "id": "image-Grtl3Tj5d5",
            "x": -290,
            "y": -50,
            "width": "100px",
            "height": "100px",
            "href": "https://live.mdnplay.dev/fr/docs/Web/CSS/object-fit/mdn_logo_only_color.png"
        },
        {
            "type": "image",
            "id": "image-kZlOrT9ynD",
            "x": 446,
            "y": -43,
            "width": "30",
            "height": "30",
            "href": "https://www.svgheart.com/wp-content/uploads/2021/11/swirly-christmas-tree-with-star-holiday-free-svg-file-SvgHeart.Com.png",
            "fill": "#ffffff",
            "stroke": "#777777",
            "stroke-width": 2
        }
    ]
}

// Store 'store'
//
export const useStore = defineStore('appStore', {
    state: () => ({
        scene: {
            "currentLayerId": "layer-Lthtl3Tj575",
            "type": "svg",
            "width": "21cm",
            "height": "29.7cm",
            "viewBox": "0 0 500 500",
            elements: [layer0, layer1],
        },
        //
        lastCreatedElement: undefined,
        lastPoint: { x: 0, y: 0 },
        //
        // TODO: Is not Part of Scene
        //
        showBatch: false,
        showSettings: false,
        showExport: false,
        showFun: false,
    }),
})