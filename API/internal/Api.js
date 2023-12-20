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

// UI
//
import cmd from 'api/cmd'
import editor from 'api/editor'
import selection from 'api/selection'
import message from 'api/message'
import tool from 'api/tool'
//
// SCENE
//
import layer from 'api/layer'
import element from 'api/element'
import scene from 'api/scene'
import view from 'api/view'
//
// IO
//
import io from 'api/io'

export default {
    // UI
    cmd,
    tool,
    message,
    selection,
    editor,
    view,
    // IO
    io,
    // SCENE
    scene,
    element,
    layer
};

/*

                                     [API]
      [IO] | [SCENE]                   |                    [UI]
             [SCENE] [LAYER] [ElEMENT] | [CMD] | [SELECTION] | [MESSAGE] | [TOOL]

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