//app-store.js
import { createStore } from 'riot-state';

const exampleScene = {
    viewBox: "0 0 500 500",
    elements: [
        {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 500,
            y2: 500
        },
        {
            type: "layer",
            name: "layer0",
            elements: [
                {
                    type: "line",
                    x1: 0,
                    y1: 500,
                    x2: 500,
                    y2: 0
                },
                {
                    type: "circle",
                    cx: 250,
                    cy: 250,
                    r: 100
                }
            ]
        }
    ]
}

const name = "example"

const state = {
    number: 0,
    scene: exampleScene
}

const actions = {
    increment(value = 1) {
        this.number += value;
    },

    decrement(value = 1) {
        this.number -= value;
    }
};

export default createStore({
    name,
    state,
    actions
});