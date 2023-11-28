// io.js
//

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
    const url = 'http://localhost:8000/v2/save/'

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()
        })
        .then(data => {
            //console.log('POST request successful:', data);
            if (onSuccessFn) {
                onSuccessFn(data, name)
            }
        })
        .catch(error => {
            console.error('There was a problem with the POST request:', error)
        })
} // save

// Load
//
function load(onSuccessFn, name) {

    const url = 'http://localhost:8000/v2/load/'; // Replace with your API endpoint
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
