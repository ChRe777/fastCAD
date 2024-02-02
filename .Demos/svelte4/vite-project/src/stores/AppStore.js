// AppStore.js

// Links
//
// https://svelte.dev/tutorial/writable-stores


// Imports
//
import { readable, writable } from 'svelte/store';
import io from '../services/IORestStorageService.js'

// Constants
//

const sceneName = "scene.v2.json"

const defaultScene = {
    type: "svg",
    attributes: {
        width: "29.7cm",
        height: "21cm",
        viewBox: "0 0 600 400",
        "data-currentLayerId": "layer-Lthtl3Tj575",
    },
    childs: [
        {
            type: "g",
            attributes: {
                id: "layer-Lthtl3Tj575",
                fill: "#ffffff",
                stroke: "#ffffff",
                "stroke-width": 9,
                "stroke-opacity": "",

                "data-type": "layer",
                "data-name": "default",
                "data-description": "Default layer 0 description long",
                "data-isopen": true,
                "data-isfrozen": false,
                "data-visibility": "visible",
            },
            childs: [
                {
                    type: "text",
                    attributes: {
                        id: "text-9ZHNBXK77",
                        x: 30,
                        y: 350,
                        "font-family": "Chalkduster",
                        "font-size": "25px",
                        "stroke-width": 0,
                        fill: "#00f900",
                        stroke: "#777777"
                    },
                    childs: [
                        {
                            type: "#text",
                            attributes: {
                                data: "This is a Text",
                            },
                            childs: []
                        },
                        {
                            type: "tspan",
                            attributes: {
                                rotate: 10,
                                x: 0,
                                dx: 0,
                                dy: 10,
                                fill: "red"
                            },
                            childs: [
                                {
                                    type: "#text",
                                    attributes: {
                                        data: "This is a tspan",
                                    },
                                    childs: []
                                },
                            ]
                        }
                    ]
                },
                {
                    type: "image",
                    attributes: {
                        id: "image-Grtl3Tj44",
                        x: 230,
                        y: 150,
                        width: "50px",
                        height: "50px",
                        href: "https://live.mdnplay.dev/fr/docs/Web/CSS/object-fit/mdn_logo_only_color.png",
                    },
                    childs: []
                },
            ]
        },
        {
            type: "image",
            attributes: {
                id: "image-Grtl3Tj5d5",
                x: 290,
                y: 50,
                width: "100px",
                height: "100px",
                href: "https://live.mdnplay.dev/fr/docs/Web/CSS/object-fit/mdn_logo_only_color.png",
            },
            childs: []
        },
        {
            type: "polyline",
            attributes: {
                id: "polyline-Pltl3Tj575",
                points: "200,160 200,260 300,260 300,160",
                "fill-opacity": 0,
                "stroke-dasharray": "5",
                stroke: "white",
                pathLength: 105,
            },
            childs: []
        },
        {
            type: "text",
            attributes: {
                "id": "text-E9o4atjVYP",
                "x": 110,
                "y": -205,
                "font-family": "Chalkduster",
                "font-size": "25px",
                "fill": "#ffffff",
                "stroke": "#ffffff",
                "stroke-width": 1,
                "fill-opacity": 0.5,
                "rotate": "7"
            },
            childs: [
                {
                    type: "#text",
                    attributes: {
                        text: "Cmds",
                    },
                    childs: []
                }
            ]
        },
    ],
};

// Store data
//
let appStore = writable({
    scene: defaultScene,
    lastPoint: { x: 0, y: 0 }
})

// Store functions
//

// Load
//
function loadScene() {

    io.load(sceneName, (json, name) => {
        console.log("scene loaded", name)
        appStore.update((state) => {
            console.log(state)
            state.scene = json
            console.log(state)
            return state
        })
    })
}

function storeScene() {
    const data = $appStore.scene
    console.log("data", data)
    io.save(data, sceneName, (data, name) => {
        console.log("scene stored", name, data)
    })
}

// Exports
//

// Store data
//
export default appStore

// Store Functions
//
export {
    loadScene,
    storeScene
}