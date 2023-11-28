// Utils.js
//

// Arguments utils
//

function asInt(args, index) {
    if (args === undefined) {
        return undefined
    }
    return parseInt(args[index])
}

function asFloat(args, index) {
    if (args === undefined) {
        return undefined
    }
    return parseFloat(args[index])
}

function asString(args, index) {
    if (args === undefined) {
        return undefined
    }
    return args[index]
}

function asPoint2(args, index) {
    if (args === undefined) {
        return undefined
    }

    let str = args[index]
    if (str === undefined) {
        return undefined
    }

    var relative = false
    if (str.startsWith("@")) {
        relative = true
        str = str.replace("@", "")
    }

    let xy = str.split(',')
    let x = parseFloat(xy[0])
    let y = parseFloat(xy[1])

    return [
        { x: x, y: y },
        relative
    ]
}

export let argFns = {
    asInt,
    asFloat,
    asString,
    asPoint2
}

// Point Utils
//

export function addPoints(p1, p2) {
    return {
        x: p1.x + p2.x,
        y: p1.y + p2.y
    }
}

export function subPoints(p1, p2) {
    return {
        x: p1.x - p2.x,
        y: p1.y - p2.y
    }
}

export function getSharedProperties(objects) {
    const sharedProperties = {};

    // Iterate through the objects to find shared properties
    objects.forEach(obj => {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (sharedProperties[key] === undefined) {
                    sharedProperties[key] = 1; // Count the occurrence of properties
                } else {
                    sharedProperties[key]++;
                }
            }
        }
    });

    const numObjects = objects.length;
    const finalSharedProperties = {};

    // Filter out properties that occur in all objects
    for (let key in sharedProperties) {
        if (sharedProperties[key] === numObjects) {
            finalSharedProperties[key] = true;
        }
    }

    return finalSharedProperties;
}

export function fillSharedValues(objects, sharedProperties) {
    const mergedObject = {};

    sharedProperties = Object.keys(sharedProperties);

    // Iterate through shared properties and fill values
    sharedProperties.forEach(prop => {
        let sameValue = true;
        let value = objects[0][prop];

        for (let i = 1; i < objects.length; i++) {
            if (objects[i][prop] !== value) {
                sameValue = false;
                break;
            }
        }

        mergedObject[prop] = sameValue ? value : undefined;
    });

    return mergedObject;
}

export function removeUndefined(obj) {
    for (let prop in obj) {
        if (obj[prop] === undefined) {
            delete obj[prop];
        }
    }
    return obj;
}

