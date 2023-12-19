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

import object from '../API/FnSets/Object.js'
import sceneFn from '../API/FnSets/SceneFn.js'
import parentFn from '../API/FnSets/ParentFn.js'
import childFn from '../API/FnSets/ChildFn.js'
import layerFn from '../API/FnSets/LayerFn.js'
import elementFn from '../API/FnSets/ElementFn.js'

import { useCacheStore } from 'stores/cache'

// Scene
//
let sceneObj = object.create(store.scene)
sceneFn.setObject(sceneObj)


let cacheStore = useCacheStore()
cacheStore.clear()

// Walk through all in scene
//
sceneFn.forEach((parentObj, elementObj) => {

    // <!-- Fill Caches
    let cacheStore = useCacheStore()
    cacheStore.setParent(parentObj.getInternal(), elementObj.getInternal().id)
    cacheStore.setElementById(elementObj.getInternal(), elementObj.getInternal().id)

    //      Fill Caches -->

    parentFn.setObject(elementObj)
    elementFn.setObject(elementObj)
    childFn.setObject(elementObj)
    layerFn.setObject(elementObj)

    console.log("id:", elementFn.getId())
    console.log("type:", elementObj.getType())
    console.log("hasChilds:", parentFn.hasChilds())
    console.log("layer - isopen:", layerFn.isOpen())

    elementFn.setObject(parentObj)
    console.log("parent id:", elementFn.getId())

    childFn.setObject(elementObj)
    elementFn.setObject(childFn.getParent())
    console.log("parent id:", elementFn.getId())

    console.log("")
})
console.log("---")

let element = sceneFn.getElementById("layer-Laltl3Tj123")
console.log("element.isEmpty:", element.isEmpty())

elementFn.setObject(element)
elementFn.getType()
console.log("type of element:", elementFn.getType())

console.log("---")