// toolbar.js
//

// Import
//
import { useCmdStore } from 'stores/cmd'

// Template
//
const template = `
<div class="flex-appbar">
    <div class="flex-appbar-btn" v-for="btn in buttons" @click="onClick(btn.cmd)">
        <i class="flex-appbar-btn-icon" :class="btn.iconClass"></i>
        <div class="flex-appbar-btn-text">{{btn.text}}</div>
    </div>
</div>`

// Data
//
function data() {


    return {
        cmdStore: useCmdStore(),
        buttons: [
            {
                text: "Load",
                iconClass: "bi bi-folder-fill",
                cmd: "load"
            },
            {
                text: "Save",
                iconClass: "bi bi-floppy-fill",
                cmd: "save"
            },
            {
                text: "Export",
                iconClass: "bi bi-cloud-download-fill",
                cmd: "export"
            },
            {
                text: "Settings",
                iconClass: "bi bi-gear-fill",
                cmd: "settings"
            },
            {
                text: "Batch",
                iconClass: "bi bi-chat-right-text-fill",
                cmd: "batch"
            }
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
            let cmds = this.cmdStore.registeredCmdsByName
            if (cmdName in cmds) {
                const cmd = cmds[cmdName]
                cmd.action() // TODO: args
            }
        }
    }
}