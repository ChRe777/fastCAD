// Imports
//
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Components
//
import App from 'components/app'
import SvgElement from 'components/element'

// Init Store
//
const pinia = createPinia()

// Init Application
//
const app = createApp(App)
app.component('svg-element', SvgElement) // Recursive Component
app.use(pinia)
app.mount('#app')

// Init Services
//
import { init as initCmds } from 'services/cmds'
import { init as initTools } from 'services/tools'

initCmds()
initTools()

// Watch Stores
//
import { watch } from 'vue'
import { useStore } from 'stores/store'
import { useViewStore } from 'stores/view'
import { useCmdStore } from 'stores/cmd'

// Get stores
//
const store = useStore()
const viewStore = useViewStore()
const cmdStore = useCmdStore()

// Init store watches
//

// Store full state
//
watch(
    pinia.state,
    (state) => {
        // persist the whole state to the local storage whenever it changes
        // localStorage.setItem('storeState', JSON.stringify(state))
    },
    { deep: true }
)

// Store App state
watch(
    store,
    (state) => {
        // persist the whole state to the local storage whenever it changes
        localStorage.setItem('storeState', JSON.stringify(state))
    },
    { deep: true }
)



// View store
//
watch(
    viewStore,
    (state) => {
        // persist the whole state to the local storage whenever it changes
        // console.log("viewStore.state:", state)
        // localStorage.setItem('storeViewState', JSON.stringify(state))
    },
    { deep: true }
)

// Command store
//
watch(
    cmdStore,
    (state) => {
        // persist the whole state to the local storage whenever it changes
        //localStorage.setItem('cmdState', JSON.stringify(state))
        console.log("cmd store changed:", state)
    },
    { deep: true }
)

// TODO: Run Health Tests
//
// import testing from 'test/all'
// testing.runAllTests()

// Load Scene 
// TODO: Load last file - cmd.InvokeByName
//
const cmdName = 'load'
const args = [cmdName, 'scene.json']
cmdStore.registeredCmdsByName[cmdName].action(args)

// Test FunctionSet Style of Programming
//

import PObject from 'fnSets/Object'

import SceneFn from 'fnSets/SceneFn'
import ParentFn from 'fnSets/ParentFn'
import ChildFn from 'fnSets/ChildFn'
import LayerFn from 'fnSets/LayerFn'
import ElementFn from 'fnSets/ElementFn'

import { useCacheStore } from 'stores/cache'

console.log("-------START-------")

// Scene
//
let sceneObj = PObject.create(store.scene)
SceneFn.setObject(sceneObj)

let cacheStore = useCacheStore()
cacheStore.clear()

// Walk through all in scene
//
SceneFn.forEach((parentObj, elementObj) => {

    console.log("parentObj", parentObj)
    // <!-- Fill Caches
    let cacheStore = useCacheStore()
    cacheStore.setParent(parentObj.getInternal(), elementObj.getInternal().id)
    cacheStore.setElementById(elementObj.getInternal(), elementObj.getInternal().id)
    // Fill Caches -->

    ParentFn.setObject(elementObj)
    ElementFn.setObject(elementObj)
    ChildFn.setObject(elementObj)
    LayerFn.setObject(elementObj)

    console.log("id:", ElementFn.getId())
    console.log("type:", elementObj.getType())
    console.log("hasChilds:", ParentFn.hasChilds())
    console.log("getChilds:", ParentFn.getChilds())
    console.log("layer - isopen:", LayerFn.isOpen())

    ElementFn.setObject(parentObj)
    console.log("parent id:", ElementFn.getId())

    ChildFn.setObject(elementObj)
    let [parentObj_, status] = ChildFn.getParent()
    ElementFn.setObject(parentObj_)
    console.log("parent id:", ElementFn.getId(), "status ok:", status.isSuccess())

    console.log("")
})

console.log("--------------------")

let [element, status] = SceneFn.getElementById("layer-Laltl3Tj123")
console.log("element.isEmpty:", element.isEmpty(), "status ok:", status.isSuccess())

ElementFn.setObject(element)
ElementFn.getType()
console.log("type of element:", ElementFn.getType())

console.log("---------END---------")