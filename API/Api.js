// api.js
//

// Is like a CRUD(S) .. Create, Update and Delete (+ Select)

// create -> id / id -> destroy
// id -> modify -> id
// id -> select -> id/ id -> deselect -> id


//
// [UI/LOGIC] <--> [STORE] <--> [IO] <--> [SERVER] <--> [DB/FILE]
//

// Imports
//

// Stores are the models
//
import { useStore } from 'stores/store'


// get Element by Id
//


// API
//
const api = {
    //create,
    //destroy,
    //modify,
    //
    //mirror,
    //
    /*
    select,
    deselect,
    deselectAll,
    isSelected,
    */
    //
    //getElementById,
    //
    /*  createLayer,
        setCurrentLayer,
        getCurrentLayer,
        isCurrentLayer,
        getLayerById,
        getLayerByName,
        hasLayerChilds,
        numLayerChilds,
        isLayerOpen,
        toogleLayerOpen,
    */
    //
    /*
    newScene,
    saveScene,
    loadScene,
    */
    //
    // TODO: Refactor
    //
    //destroySelected,
    //copySelected,
    //mirrorSelected,
    //modifySelected,
    //moveSelected,
    //
    //
    /*
    viewZoomIn,
    viewZoomOut,
    */
    //
    //createMessage,
    //
    //
    //invokeCmdByName,
    //
    //getBlobJSON,
    //getBlobSVG
}

// see Re-exporting / Aggregating
// https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export

import cmd from 'api/cmd'
import layer from 'api/layer'
import message from 'api/message'
import scene from 'api/scene'
import selection from 'api/selection'

export default {
    cmd,
    layer,
    message,
    scene,
    selection
};