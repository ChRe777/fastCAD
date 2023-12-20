// Modify.js

// Modifies elements, but not modifies the scene
// Not modify the parent child relationsships

// Imports
//
import mover from 'api/modify/move'
import rotater from 'api/modify/rotate'
import mirrorer from 'api/modify/mirror'

// modify
//
function assign(element, type, attrs) {
    if (element === undefined) {
        return
    }

    // console.log("modify", element.type, type)
    if (type === 'layer') {
        type = 'g'
    }

    if (element.type === type) {
        Object.assign(element, attrs)
    }

    return element
}

function move(element, attrs) {

    let pRel = attrs['p']
    let [p, relative] = pRel

    mover.move(element, p, relative)
}

function rotate(element, attrs) {

    let angle = attrs['angle']
    let [p, relative] = attrs['p']

    rotater.rotate(element, angle, p, relative)
}

function mirror(element,) {

    let axis = attrs['axis']
    let value = attrs['value']

    mirrorer.mirror(element, axis, value)
}

// Exports
//
export default {
    assign,
    move,
    rotate,
    mirror
}
