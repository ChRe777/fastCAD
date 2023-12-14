// Layer.js

// Imports
//
import layers from 'api/layer'

// Set layer
//
function set(element, layerName) {
    const newLayer = layers.getByName(layerName)
    layers.forEach(layer => removeFrom(layer, element))
    layers.addTo(newLayer, selectedElement)
}

export default {
    set
}