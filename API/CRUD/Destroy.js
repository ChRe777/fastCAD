// Destroy.js

// Element must bre remove from their parents
// before they are get destroyed
// When they are destroyed they have to be remove from caches
// like elementByIdCache, elementsByTypeCache

// Imports
import { useStore } from 'stores/store'
import selection from 'api/selection'
import layers from 'api/layer'

// Functions
//

function element(element, type, attrs) {

    const store = useStore()

    // Remove from all layers
    //
    layers.forEach(layer => layers.removeElement(layer, element))

    // if destroyed was last element
    //
    if (store.lastCreatedElement != undefined) {
        if (store.lastCreatedElement.id === element.id) {
            store.lastCreatedElement = undefined
        }
    }
}

function selected() {

    // Remove from layers
    //
    selection.forEach(selectedElement => {
        element(selectedElement)
    })

    // Remove from selection
    //
    selection.clear()
}

// Exports
//
export default {
    element,
    selected
}
