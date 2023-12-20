// Status.js

// Exports
//
export default {
    create
}

export const StatusCode = {
    "kSuccess": "kSuccess",
    "kFailure": "kFailure",
    "kInsufficientMemory": "kInsufficientMemory",
    "kInvalidParameter": "kInvalidParameter",
    "kLicenseFailure": "kLicenseFailure",
    "kUnknownParameter": "kUnknownParameter",
    "kNotImplemented": "kNotImplemented",
    "kNotFound": "kNotFound",
    "kEndOfFile": "kEndOfFile"
}

export const StatusCodeText = {
    "kSuccess": "The operation was successful",
    "kFailure": "The operation failed",
    "kInsufficientMemory": "The operation failed due to insufficient memory",
    "kInvalidParameter": "An invalid parameter was provided",
    "kLicenseFailure": "Application is not licensed for the attempted operation",
    "kUnknownParameter": "Returned by MPxNode:: compute for unrecognised plugs",
    "kNotImplemented": "Not currently used",
    "kNotFound": "Not currently used",
    "kEndOfFile": "Not currently used"
}

export const Status = {
    // TODO: Rethink
    "kSuccess": create({ "statusCode": StatusCode.kSuccess }),
    "kFailure": create({ "statusCode": StatusCode.kFailure })
}

function create(spec) {

    console.log("Status.create - spec", spec)

    // Private 
    //
    let { statusCode, errorText } = spec

    console.log("Status.create - statusCode", statusCode)

    // Private 
    //
    // const errorText = errorText_
    // const statusCode = statusCode_

    // Public functions
    //
    function getErrorText() {
        //console.log("errorText", errorText, statusCode)
        if (errorText === "" || errorText === undefined)
            return StatusCodeText[statusCode]
        return errorText
    }

    function getStatusCode() {
        return statusCode
    }

    function printError() {
        console.error(errorText())
    }

    function isSuccess() {
        return is(StatusCode.kSuccess)
    }

    // statusA.is(statusB)
    // statusA.is(statusCode.kSuccess)
    function is(status) {
        if (typeof (status) === "string")
            return statusCode === status
        return statusCode === status.statusCode()
    }

    return Object.freeze({
        getErrorText,
        getStatusCode,
        printError,
        isSuccess,
        is
    })
}

