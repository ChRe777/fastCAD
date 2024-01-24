// IOLocalStorage.js

function load(name, onSuccessFn) {

    // Load from LOCALSTORAGE as FileSystem
    //
    const key = 'file://fastCAD/' + name
    const jsonStr = localStorage.getItem(key)

    try {
        const json = JSON.parse(jsonStr)
        onSuccessFn(json, name)
    }
    catch (err) {
        // TODO: Error Message
        //document.getElementById("demo").innerHTML = err.message;
    }
}

function downloadJSON() {
    const jsonData = localStorage.getItem('userData');

    if (jsonData) {
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = url;
        downloadLink.style.display = 'block';

        // You can also trigger a click to simulate the download
        // downloadLink.click();
    } else {
        console.error('No JSON data in localStorage.');
    }
}

function save(data, name, onSuccessFn) {

    // SAVE INTO LOCALSTORAGE as FileSystem
    
    const key = 'file://fastCAD/' + name

    localStorage.setItem(key, JSON.stringify(data))

    if (onSuccessFn) {
        onSuccessFn(data, name)
    }
    

    // TODO
}

// Exports
//
export default {
    load,
    save
}