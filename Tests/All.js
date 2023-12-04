// test.js

function runHealthTests() {

    // test units
    console.log("RUN UNITS TESTS")
    testUnits()

    // test commands
    console.log("RUN COMMANDS TESTS")

    // test cmdline

    // ...

}

import layerAPI from 'test/api/layer'

function testUnits() {
    layerAPI.runTests()
}

function runAllTests() {
    console.log("RUN ALL TESTS")
    console.log("-------------")
    console.log("RUN HEALTH TESTS")
    runHealthTests()
    console.log("-----END-----")
}

export default {
    runAllTests
}