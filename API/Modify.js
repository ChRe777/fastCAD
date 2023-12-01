// Modify.js

// Imports
//

// modify
//
function modify(element, type, attrs) {
    if (element === undefined) {
        return
    }

    if (element.type === type) {
        Object.assign(element, attrs)
    }
    return element
}
