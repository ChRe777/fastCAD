// Imports
//
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Components
//
import App from 'components/app'

// Init Store
//
const pinia = createPinia()

// Init Editor
//
const app = createApp(App)
app.use(pinia)
app.mount('#app')

// Init Commands
//
import { init as initCmds } from 'scripts/cmds'

initCmds()

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
watch(
    store,
    (state) => {
        // persist the whole state to the local storage whenever it changes
        localStorage.setItem('storeState', JSON.stringify(state))
    },
    { deep: true }
)

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


// Load
//
const cmdName = 'load'
const args = [cmdName, 'scene.json']
cmdStore.registeredCmdsByName[cmdName].action(args)
