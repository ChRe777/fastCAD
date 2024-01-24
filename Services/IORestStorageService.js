// IORestService.js
//

// weare.gleeze.com:443 -> 64.123.234.15:443 -> localhost:8000 -> index.html
// index.html -> JS -> load -> localhost:9000

// Constants
//
//const loadURL = 'http://localhost:9000/v2/load'
//const saveURL = 'http://localhost:9000/v2/save'

// TODO: 
// Store in LocalStorage for website and configure in settings.
//
// const loadURL = 'http://store.reif.com:9000/v2/load'
// const saveURL = 'http://store.reif.com:9000/v2/save'

const loadURL = 'https://weare.gleeze.com/io/v2/load'
const saveURL = 'https://weare.gleeze.com/io/v2/save'

function makeOptions(data, name) {
    const json = {
        'cmd': 'save_data',
        'data': data,
        'name': name || null
    }

    // console.log(JSON.stringify(json))

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Adjust the content type if necessary
        },
        body: JSON.stringify(json)
    }
    return options
}

// Save
//
function save(data, name, onSuccessFn) {

    const options = makeOptions(data, name)
    const url = saveURL

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            if (onSuccessFn) {
                console.log("I am here 1")
                onSuccessFn(data, name)
                console.log("I am here 2")
            }
        })
        .catch(error => {
            console.error('There was a problem with the POST request:', error)
        })
} // save

// Load
//
function load(name, onSuccessFn) {

    const url = loadURL
    const json = {
        'cmd': 'load_data',
        'data': {},
        'name': name || null
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Adjust the content type if necessary
        },
        body: JSON.stringify(json)
    }

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
        .then(json => {
            onSuccessFn(json, name)
        })
        .catch(error => {
            console.error('There was a problem with the POST request:', error)
        })

} // load


// Exports
//
export default {
    load,
    save
}
