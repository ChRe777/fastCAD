// toolbar.js
//

// Import
//
import { useCmdStore } from 'stores/cmd'

// Template
//
const template = `
<div class="flex-toolbar">
    <div class="flex-btn" v-for="btn in buttons" @click="onClick(btn.cmd)">
        <i :class="btn.iconClass"></i>
        <div class="flex-btn-text">{{btn.text}}</div>
    </div>
</div>`

// Data
//
function data() {


    return {
        cmdStore: useCmdStore(),
        buttons: [
            { text: "Circle", iconClass: "bi bi-circle"    , cmd: "circle" },
            { text: "Line",   iconClass: "bi bi-slash-lg"  , cmd: "line"   },
            { text: "Text",   iconClass: "bi bi-textarea-t", cmd: "text"   },
            { text: "Image",  iconClass: "bi bi-image"     , cmd: "image"  }
        ]
    }
}

// Export component
//
export default {
    data,
    template,
    methods: {
        onClick(cmdName) {
            // console.log("click cmd ", cmdName)
            if (cmdName in this.cmdStore.registeredCmdsByName) {
                const cmd = this.cmdStore.registeredCmdsByName[cmdName]
                cmd.action() // TODO: args
            }
        }
    }
}