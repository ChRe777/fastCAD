// api.js
//

// Is like a CRUD(S) .. Create, Update and Delete (+ Select)

// create -> id / id -> destroy
// id -> modify -> id
// id -> select -> id/ id -> deselect -> id

//
// [UI/LOGIC] <--> [STORE] <--> [IO] <--> [SERVER] <--> [DB/FILE]
//

//
// MODELS = STORES
// VIEW = VUE-COMPONENTS
// CONTROLLERS = API
//


// Imports
//

// Stores are the models
//

// see Re-exporting / Aggregating
// https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export

import cmd from 'api/cmd'
import create from 'api/create'
import destroy from 'api/destroy'
import layer from 'api/layer'
import message from 'api/message'
import modify from 'api/modify'
import scene from 'api/scene'
import selection from 'api/selection'
import tool from 'api/tool'
import view from 'api/view'
import io from 'api/io'

export default {
    cmd,
    tool,
    // CRUD
    create,
    modify, // Mirror, Move, Rotate, Scale, ...
    destroy,
    //
    io,
    //
    scene,
    layer,
    //
    message,
    selection,
    view
    //

};

/*

                           [API]
                    |                    [UI]
     [IO] | [SCENE] | [CMD] | [SELECTION] | [MESSAGE] | [TOOL]

api.scene
api.cmd
api.selection
api.message
api.io
api.app

---

app.scene
app.element (CRUD)
app.cmd
app.selection
app.message
app.io
app.view (MainView, PrintView, Sheets)

---

api.element.getById
api.element.create // Create element and then later it will added to scene
api.layer.create   // Create layer and then it will be added to scene
api.scene.appendChild(parent, child)

api.cmd.invokeCmdByName
api.cmd.commands

*/

/*
api

    //
    // CORE
    //
    create
        circle
        text
        path
        ...
        copy

    destroy
        element
        selected

    //
    // App
    //

    scene
        //createElement(type, attr)
        getParent(element)
        getChilds(element)
        //getElementById(id)
        appendChild(parent, element)
        removeChild(parent, element)
        forEach(parent, element)

    //
    // layers are part of scene?
    //
    layer
        [?] getLayerById (= getElementById)
        [x] isOpen
        [x] isVisible

    //
    // IO is part of App
    //
    io
        [x] load
        [x] save

    //
    // GUI / TUI
    //

    cmd
        [x] register
        [v] invokeByName (execute)

    selection
        [x] select
        [x] deselect

    view
        [x] zoomIn
        [x] zoomOut
        [x] pan

    message
        [x] create

    tool
        [x] register
        [x] activate
        [x] deactivate

*/