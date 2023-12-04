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
import view from 'api/view'

export default {
    cmd,
    create,
    destroy,
    layer,
    message,
    modify,
    scene,
    selection,
    view
};

// copy {id}
// copy [selected]

/*
api
    create
        circle
        text
        path
        ...
        copy
    destroy
        element
        selected
    cmd
        invokeByName(execute)
    scene
        load
        save
        (getElementById)
    layer
        getById
        isOpen
        isVisible
    message
        create
    selection
        select
        deselect
    view
        zoomIn
        zoomOut
*/