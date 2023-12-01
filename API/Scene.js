// Scene.js

// Imports
//
import { useMessageStore } from 'stores/message'
import { useStore } from 'stores/store'

import io from 'services/io'

import api from 'api/api'
import layers from 'api/layer'
import selections from 'api/selection'
import editor from 'api/editor'

// Functions
//
function clear() {
    const store = useStore()
    store.scene.layers = []
}

function create() {
    clear()
    selections.clear()
    editor.clear()
}

function save(name) {
    const store = useStore()
    const messagesStore = useMessageStore()

    const successFn = function (data, name) {
        console.log("data", data)
        messagesStore.messages.push(`Saved ${name}`)
    }

    io.save(store.scene, name, successFn)
}

function set_(scene) {
    const store = useStore()
    store.scene = scene
}

function load(name) {

    let onLoaded = function (scene, name) {
        set_(scene)
        layers.initCaches() // api.layer.initCaches()
        layers.selectFirst()
        api.message.create(`Loaded ${name}`) // api.message.create
    }

    io.load(name, onLoaded)
}


// TODO: CACHING AND REFACOTRING
function getElementById_(layer, id) {

    let element = layer.elements.find((obj) => obj.id === id)
    if (element != undefined) {
        return element
    }

    for (let subLayer in layer.layers) {
        let element_ = getElementById_(subLayer, id)
        if (element_ != undefined) {
            return element_
        }
    }
}

function getElementById(id) {

    const store = useStore()

    for (let layer in store.scene.layers) {
        let element = getElementById_(layer, id)
        if (element != undefined) {
            return element
        }
    }

    return undefined
}

// Exports
//
export default {
    load,
    save,
    create,
    clear,
    getElementById
}
