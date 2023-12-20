// IO.js

// Imports
//
import io from 'services/io'
import scene from 'api/scene'

// Save the scene
//
function save(name, successFn) {
    io.save(scene.get(), name, successFn)
}

// Load scene by name
//
function load(name, successFn) {
    io.load(name, successFn)
}

// Exports
//
export default {
    load,
    save
}