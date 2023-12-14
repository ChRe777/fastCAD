// View.js

// Imports
//
import { useViewStore } from 'stores/view'

// Functions
//
function zoomIn() {
    const viewStore = useViewStore()
    let step = Math.log2(viewStore.zoomFactor)

    // -19 .. 19
    if (-19 <= step && step < 19) {
        viewStore.zoomFactor *= 2;
    }
}

function zoomOut() {
    const viewStore = useViewStore()
    let step = Math.log2(viewStore.zoomFactor)

    // -19 .. 19
    if (-19 < step && step <= 19) {
        viewStore.zoomFactor /= 2;
    }
}

function zoom(scale) {
    const viewStore = useViewStore()
    let step = Math.log2(viewStore.zoomFactor)

    // -19 .. 19
    if (-19 < step && step <= 19) {
        viewStore.zoomFactor = scale
    }
}

function pan(deltaX, deltaY) {
    const viewStore = useViewStore()

    let zoomFactor = viewStore.zoomFactor

    scrollX -= (deltaX / zoomFactor)
    viewStore.scrollX = scrollX

    scrollY -= (deltaY / zoomFactor)
    viewStore.scrollY = scrollY
}

function getZoomFactor() {
    const viewStore = useViewStore()
    return viewStore.zoomFactor
}

function getViewBox() {
    const viewStore = useViewStore()
    return viewStore.viewBox
}

function setSize(width, height) {
    const viewStore = useViewStore()
    viewStore.width = width
    viewStore.height = height
}

// Exports
//
export default {
    // Actions
    zoomIn,
    zoomOut,
    zoom,
    pan,
    // Getter
    getZoomFactor,
    getViewBox,
    // Setter
    setSize
}