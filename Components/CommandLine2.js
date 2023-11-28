// cmdline.js
//

// Imports
//
import { useStore } from 'stores/store'
import { useCmdStore } from 'stores/cmd'
import { interpret } from 'services/interpreter'
//
import Batch from 'components/batch'


// Template
//
const batch = `
<span 
    id="cmdLineBatch" 
    class="input-group-text btn btn-primary rounded-0" 
    @click="onBatch">Script <i class="bi bi-file-earmark-code-fill"></i>
</span>
`

const template = `
<input 
    ref="cmdLineInput" 
    id="cmdLineInput" 
    type="text" v-model="text" 
    @keyup.enter="onEnter" 
    @keydown.tab.prevent="onTab" 
    class="form-control" 
    aria-label="enter a command">
<input 
    ref="cmdLineSuggestion" 
    id="cmdLineSuggestion" 
    class="form-control shadow-none" 
    type="text" 
    :placeholder="suggestion" >
` + batch

function focus(el) {
    el.$refs.cmdLineInput.focus()
}

function onClick() {
    focus(this)
}

let error = false

function onEnter() {
    if (interpret(this.text)) {
        error = false
        this.text = ""
    } else {
        error = true
        this.text = ""
    }
}

function onTab() {
    let suggestion = getSuggestion(this.text)
    // Move forward to first parameter
    this.text = suggestion.split("{")[0]
}

function getSuggestion(str) {

    if (str == "") {
        if (error) {
            return "cmd not found - enter a cmd"
        }
        return "enter a cmd"
    }

    if (str.length < 2) {
        return ""
    }

    const cmdStore = useCmdStore()
    const cmdFound = cmdStore.registeredCmds.find((cmd) => cmd.suggestion.startsWith(str))
    if (cmdFound) {
        return cmdFound.suggestion
    }
    return ""
}

function onBatch() {
    const cmdStore = useCmdStore()
    let cmd = cmdStore.registeredCmdsByName["batch"]
    cmd.action()
}

function onText(newValue, _) {
    this.suggestion = getSuggestion(newValue)
}

// Mounted
//
function mounted() {
    focus(this)
    Mousetrap.bind('command', () => focus(this));
}


// Data
//
function data() {
    return {
        store: useStore(),
        text: "",
        suggestion: "enter a command"
    }
}

// Export component
//
export default {
    data,
    template,
    components: {
        Batch
    },
    watch: {
        text: onText
    },
    methods: {
        onEnter,
        onClick,
        onBatch,
        onKey(event) {
            console.log(event.keyCode)
        },
        onTab,
    },
    mounted
}
