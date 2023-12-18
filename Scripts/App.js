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
import elementFn from '../API/FnSets/ElementFn.js'
import childFn from '../API/FnSets/ChildFn.js'

// Scene
//
let sceneObj = object.create(store.scene)
sceneFn.setObject(sceneObj)

// Walk through all in scene
//
sceneFn.forEach((parentObj, elementObj) => {

    parentFn.setObject(elementObj)
    elementFn.setObject(elementObj)
    childFn.setObject(elementObj)

    console.log("id:", elementFn.getId())
    console.log("type:", elementObj.getType())
    console.log("hasChilds:", parentFn.hasChilds())

    elementFn.setObject(parentObj)
    console.log("parent id:", elementFn.getId())

    childFn.setObject(elementObj)
    console.log("parent:", childFn.getParent())

    console.log("")
})
