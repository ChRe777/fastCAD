import layers from 'api/layer'
//import testing from 'testing'

let layer = undefined

function test_create(t) {
    const name = "layer_test"
    const description = "layer test description"
    layer = layers.create(name, description)
}

function test_toogleOpen(t) {
    const got = layers.toogleOpen(layer)
    const want = true
    console.log("test - toogleOpen()")
    if (got != want) {
        console.error(`toogleOpen() want ${want}, but got ${got}`)
    }
}

function runTests() {
    test_create()
    test_toogleOpen()
}

export default {
    runTests
}

/*
export default {
    create,
    trash,
    //
    addLayer,
    removeElement,
    //
    setCurrent,
    getCurrent,
    isCurrent,
    //
    getById,
    //
    hasChilds,
    numberOfElements,
    //
    isOpen,
    toogleOpen,
    toogleVisibility,
    //
    selectFirst,
    //
    forEach,
    //initCaches
}
*/