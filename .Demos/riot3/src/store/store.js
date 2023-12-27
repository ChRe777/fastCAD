// centralStore.js

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
                },
                {
                    type: "layer",
                    name: "layer0.1",
                    elements: [
                        {
                            type: "line",
                            x1: 0,
                            y1: 250,
                            x2: 500,
                            y2: 250
                        }
                    ]
                }
            ]
        }
    ]
}

const centralStore = {

    data: {
        message: 'Initial Message',
        counter: 0,
        scene: exampleScene
    },

    getData() {
        return this.data;
    },

    // Getter method to retrieve data from the store
    getScene() {
        return this.data.scene
    },

    setScene(scene) {
        return this.data.scene = scene
    },

    // Setter method to update data in the store
    setData(newData) {
        this.data = { ...this.data, ...newData }
    },
}

export default centralStore;