// ToolbarButton.js

// Imports
//
import { useCmdStore } from 'stores/cmd'

const style = {
    "bg" : "bg-gray-800 rounded",
    "border": "border border-1 border-white border-opacity-25",
    "text" : "text-white",
    "padding" : "p-0",
    "size" : "77px"
}

// Template
//
const template =`
<div class="${style.bg} ${style.padding} ${style.border} ${style.text}" 
    @click="onClick"
    style="width: ${style.size}; height: ${style.size};"
>
    <div class="d-flex align-items-center h-100 w-100 text-center">
        <div class="m-auto">
            <i :class="iconClass" class="fs-5"></i>
            <div class="mt-1">{{text}}</div>
        </div>
    </div>
</div>
`

// Component
export default {
    props: ['iconClass', 'text', 'cmdName'],
    data() {
        return {
            cmdStore: useCmdStore()
        }
    },
    template,
    methods: {
        onClick() {
            if (this.cmdName in this.cmdStore.registeredCmdsByName) {
                const cmd = this.cmdStore.registeredCmdsByName[this.cmdName]
                const args = [this.cmdName]
                cmd.action(args)
            }
        }
    }
}

