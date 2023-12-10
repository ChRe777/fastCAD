// Fun.js

// Template
//
const template = `
<template v-for="snowFlake in snowFlakes">
    <div class="snow-flake" :style="{ top: snowFlake.y, left: snowFlake.x, width: snowFlake.w, height: snowFlake.w  }"></div>
 </template>
`

function createResizeObserver(self) {

    function outputsize() {
        self.width = document.body.clientWidth
        self.height = document.body.clientHeight
    }

    new ResizeObserver(outputsize).observe(document.body)
}

// Data
//
function data() {
    return {
        snowFlakes: [],
        time: 0,
        width: undefined,
        height: undefined
    }
}

// Component
//
export default {
    data,
    template,
    methods: {
        updatePositions() {
            this.snowFlakes.forEach(flake => {
                flake.x += flake.a * Math.sin(flake.ts + (this.time / 1000) * 3.1415)
                flake.y += flake.w
                if (flake.y > this.height) {
                    flake.y = 0
                }
            });
        },
        newFlake(i) {
            let flake = {
                id: i,
                x: Math.random() * this.width,
                y: Math.random() * -200,
                a: Math.random() * 1 + 1,
                sy: Math.random() * 2 + 2,
                ts: Math.random() * 4 - 2,
                w: Math.random() * 4 + 4
            }
            return flake
        },
        generateSnowFlakes() {
            [...Array(50).keys()].forEach(i => {
                this.snowFlakes.push(this.newFlake(i))
            })
        }

    },
    mounted() {
        this.width = document.body.clientWidth
        this.height = document.body.clientHeight

        createResizeObserver(this)

        this.generateSnowFlakes()

        // Start Animation
        setInterval(() => {
            this.time += 15
            this.updatePositions()
        }, 50);

        console.log("fun mounted")
    }
}