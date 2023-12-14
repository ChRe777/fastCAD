// Export.js

// Stores are the models
//
import { useStore } from 'stores/store'

// Functions
//
function getBlobJSON() {
    const store = useStore()

    const indent = 4
    const content = JSON.stringify(store.scene, null, indent)
    const blob = new Blob([content], { type: "application/json" })

    return blob
}

function getBlobSVG() {
    const content = document.getElementById("scene").innerHTML
    const blob = new Blob([content], { type: "image/svg+xml" })
    return blob
}

// Exports
//
export default {
    getBlobJSON,
    getBlobSVG
}