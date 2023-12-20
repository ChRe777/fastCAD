// ToolbarButton.js

// Imports
//
import api from 'api/internal'

const style = {
    "bg": "bg-dark-75 rounded",
    "border": "border border-0",
    "text": "text-white",
    "size": "77px"
}

// Template
//
const template = `
<div class="${style.bg} ${style.padding} ${style.border} ${style.text}" 
    style="width: ${style.size}; height: ${style.size}; 
           background: rgb(51,51,51); 
           border-color: rgb(41,41,41) !important; 
           cursor: pointer;"
    @click="onClick"
>
    <div class="d-flex align-items-center h-100 w-100 text-center">
        <div class="m-auto">
            <i :class="iconClass" class="fs-5"></i>
            <div class="mt-1">{{text}}</div>
        </div>
    </div>
</div>
`

// On click button
//
function onClick() {
    const args = [this.cmdName]
    api.cmd.invokeByName(this.cmdName, args)
}

// Data
//
function data() {
    return {
    }
}

// Component
export default {
    props: ['iconClass', 'text', 'cmdName'],
    data,
    template,
    methods: {
        onClick
    }
}

