// selection.js

// Imports
//
import { useStore } from 'stores/store';
import { useViewStore } from 'stores/view';

import api from 'scripts/api'


// Template
//
const template = `
<rect id="selectionRect" ref="selectionRect" 
    :x="x" :y="y" :width="width" :height="height" 
    stroke="white" stroke-dasharray="5" fill="None" />
`

// Data
//
function data() {
    return {
        svgContainer: this.$parent.$refs.svg,
        // Mode
        //
        isDragging: false,
        // Start Drag
        //
        startX: 0,
        startY: 0,
        // Rectangle
        //
        x: 0,
        y: 0,
        height: 0,
        width: 0,
    }
}

// Calc current mouse coordinate in the svg scene
//
function mouseCoordsSvg(event, svg) {

    const viewStore = useViewStore()

    var svgRect = svg.getBoundingClientRect()

    // Calculate the mouse coordinates relative to the SVG's Div
    //
    var mouseX = (event.clientX - svgRect.left) * (svg.viewBox.baseVal.width / svgRect.width);
    var mouseY = (event.clientY - svgRect.top) * (svg.viewBox.baseVal.height / svgRect.height);

    // Get Scrolling from ViewBox
    //
    let [scrollX, scrollY, _, __] = viewStore.viewBox
    mouseX += scrollX
    mouseY += scrollY

    return {
        mouseX,
        mouseY
    }
}

function onMouseDown(self) {
    return (event) => {

        if (self.$parent.isShiftPressed == false) {
            return
        }

        // Start Dragging
        //
        self.isDragging = true

        // Show selection rectangle
        //
        const selectionRect = self.$refs.selectionRect
        selectionRect.setAttribute('style', 'visibility:visible')

        // Set start point of selection rect
        //
        const current = mouseCoordsSvg(event, self.svgContainer)

        self.startX = current.mouseX
        self.startY = current.mouseY

        restRectangle(self)
    }
}

function restRectangle(self) {
    self.x = 0
    self.y = 0
    self.height = 0
    self.width = 0
}

function resetAll(self) {
    self.isDragging = false;
    self.startX = 0
    self.startY = 0
    restRectangle(self)
}

function onMouseUp(self) {
    return () => {

        if (self.isDragging == false) {
            return
        }

        // Hide selection rectangle
        //
        const selectionRect = self.$refs.selectionRect
        selectionRect.setAttribute('style', 'visibility:hidden')

        // Reset seleciont rectangle
        //
        resetAll(self)
    }
}


function trySelect(self, element, crossMode) {

    // TODO: Slow - O(n*n)
    //
    const element_ = self.svgContainer.getElementById(element.id)
    if (element_ == null) {
        console.log("element with id ", element.id, "not found")
        return
    }
    const elementRect = element_.getBoundingClientRect()
    const selectionRect = self.$refs.selectionRect.getBoundingClientRect()

    let fn = crossMode ? intersect : inside

    let insideOrIntersect = fn(elementRect, selectionRect)
    if (insideOrIntersect) {
        api.select(element)
    } else {
        //api.deselect(element)
    }
}

function iterateLayers_(layer, fn) {

    if (layer.elements) {
        layer.elements.forEach((element) => fn(element))
    }

    if (layer.layers) {
        layer.layers.forEach((layer) => iterateLayers_(layer, fn))
    }

}

function iterateLayers(fn) {
    const store = useStore()
    store.scene.layers.forEach((layer) => {
        iterateLayers_(layer, fn)
    })
}

function onMouseMove(self, svgContainer) {

    return (event) => {

        if (self.isDragging == false) {
            return
        }

        if (self.$parent.isShiftPressed == false) {
            return
        }

        // Get current relative mouse position in svg scene
        //
        const current = mouseCoordsSvg(event, svgContainer)

        // Calc size
        //
        const width = current.mouseX - self.startX;
        const height = current.mouseY - self.startY;

        // Check if crossMode (intersect objects)
        //
        let crossMode = width < 0 || height < 0

        // Set selection rectangle
        //
        self.x = Math.min(self.startX, current.mouseX)
        self.y = Math.min(self.startY, current.mouseY)
        self.width = Math.abs(width)
        self.height = Math.abs(height)

        // Go through all elements and check if they need to be selected
        //
        // TODO: SpeedUp - Bounding Box of g-(layer)-element
        //
        iterateLayers((element) => trySelect(self, element, crossMode))
    }
}


// Mounted
//
function mounted() {

    // Set container
    this.svgContainer = this.$parent.$refs.svg
    // Start Dragging
    this.svgContainer.addEventListener('mousedown', onMouseDown(this))
    // Do Dragging
    this.svgContainer.addEventListener('mousemove', onMouseMove(this, this.svgContainer))
    // End Dragging
    this.svgContainer.addEventListener('mouseup', onMouseUp(this))

}

// Function to check if the bounding box of an element is inside the selection rectangle
//
function inside(elementRect, selectionRect) {
    return (
        elementRect.left >= selectionRect.left &&
        elementRect.right <= selectionRect.right &&
        elementRect.top >= selectionRect.top &&
        elementRect.bottom <= selectionRect.bottom
    );
}

// Function to check if two rectangles intersect
//
function intersect(elementRect, selectionRect) {
    return (
        elementRect.x < selectionRect.x + selectionRect.width &&
        elementRect.x + elementRect.width > selectionRect.x &&
        elementRect.y < selectionRect.y + selectionRect.height &&
        elementRect.y + elementRect.height > selectionRect.y
    );
}

// Component
//
export default {
    data,
    template,
    mounted
}