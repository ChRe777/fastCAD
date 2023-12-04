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

function viewBox() {
    const viewStore = useViewStore()
    return viewStore.viewBox
}

// Exports
//
export default {
    zoomIn,
    zoomOut,
    //
    viewBox
}