// Destroy.js

// Imports


// Functions
//

// destroy('line-1')
//
function destroy(element, type, attrs) {

    const store = useStore()

    // Remove from all layers
    //
    store.scene.layers.map((layer) => removeFromLayer_(layer, element))

    // if destroyed was last element
    //
    if (store.lastCreatedElement != undefined) {
        if (store.lastCreatedElement.id === element.id) {
            store.lastCreatedElement = undefined
        }
    }
}

function destroySelected() {

    // Remove from layers
    //
    selections.forEach(selectedElement => {
        destroy(selectedElement)
    })

    // Remove from selection
    //
    selections.clear()
}
