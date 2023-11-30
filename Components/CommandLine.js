// cmdline.js
//

// Imports
//
import { useStore } from 'stores/store'
import { useCmdStore } from 'stores/cmd'
import { interpret } from 'services/interpreter'

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

function onEnter() {
    if (interpret(this.text)) {
        this.error = false
        this.text = ""
    } else {
        this.error = true
        this.text = ""
    }
}

function onTab() {
    let suggestion = getSuggestion(this.text)
    // Move forward to first parameter
    this.text = suggestion.split("{")[0]
}

function getSuggestion(str) {

    const cmdStore = useCmdStore()
    const cmdFound = cmdStore.registeredCmds.find((cmd) => cmd.suggestion.startsWith(str))
    if (cmdFound) {
        return cmdFound.suggestion
    }
    return ""
}

function onBatch() {
    const cmdStore = useCmdStore()
    const cmdName = "batch"
    const cmd = cmdStore.registeredCmdsByName[cmdName]
    const args = [cmdName]
    cmd.action(args)
}

function onText(newValue, _) {
    if (newValue <= 2) {
        this.suggestion = ""
    } else {
        this.suggestion = getSuggestion(newValue)
    }
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
        error: false,
        suggestion: "enter a command"
    }
}

// Export component
//
export default {
    data,
    template,
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
