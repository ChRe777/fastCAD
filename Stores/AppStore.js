// store.js
//

// Imports
//
import { defineStore } from 'pinia'

// Example Scene Layer 0
//
const layer0 = {
    "type": "g",
    "subtype": "layer",
    "style": "visibility:visible",
    "id": "layer-Laltl3Tj123",
    "name": "layer0",
    "description": "layer0 desc",
    "fill": "#00ff00",
    "stroke": "#ffffff",
    "stroke-width": "2",
    "stroke-opacity": "1.0",
    "elements": [
        {
            "type": "circle",
            "id": "circle-NlwqaSQuTI",
            "cx": 0,
            "cy": 50,
            "r": 50,
            "fill": "#00f900",
            "stroke": "#00f900",
            "stroke-width": 17,
            "stroke-dasharray": "7,7",
            "fill-opacity": "0.5",
            "stroke-opacity": 0.3
        }
    ]
}

const layer1 = {
    "type": "g",
    "subtype": "layer",
    "style": "visibility:visible",
    "id": "layer-Laltl3Tj123",
    "name": "layer1",
    "description": "layer1 desc",
    "fill": "#00ff00",
    "stroke": "#ffffff",
    "stroke-width": "2",
    "stroke-opacity": "1.0",
    "elements": [
        {
            "type": "circle",
            "id": "circle-NlwraSQuTI",
            "cx": 50,
            "cy": 50,
            "r": 70,
            "fill": "#00f900",
            "stroke": "#00f900",
            "stroke-width": 17,
            "stroke-dasharray": "7,7",
            "fill-opacity": "0.5",
            "stroke-opacity": 0.3
        }
    ]
}

// Store 'store'
//
export const useStore = defineStore('appStore', {
    state: () => ({
        scene: {
            "currentLayerId": "layer-Laltl3Tj123",
            elements: [layer0, layer1],
        },
        //
        lastCreatedElement: undefined,
        lastPoint: undefined,
        //
        // TODO: Is not Part of Scene
        //
        showBatch: false,
        showSettings: false,
        showExport: false,
        showFun: false,
    }),
})