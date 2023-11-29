// Imports
//

import ioLocal from "services/io-local"
import ioRest from "services/io-rest"

// Save
//
function save(data, name, onSuccessFn) {
    // As BACKUP Lokal too ??
    ioLocal.save(data, name, onSuccessFn)
    ioRest.save(data, name, onSuccessFn)
} // save

// Load
//
function load(name, onSuccessFn) {
    //ioLocal.load(data, name, onSuccessFn)
    ioRest.load(name, onSuccessFn)
} // load


// Exports
//
export default {
    load,
    save
}