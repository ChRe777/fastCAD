// toolbar.js
//

// Import
//
import ToolbarButton from 'parts/button'

// Template
//
const template = `
<div class="d-flex flex-wrap gap-2">
    <template v-for="btn in buttons">
        <toolbar-button :iconClass="btn.iconClass" :text="btn.text" :cmdName="btn.cmdName"></toolbar-button>
    </template>
</div>`

const templateOLD = `
<div class="flex-toolbar">
    <div class="flex-btn rounded-1 border-1 border-primary" v-for="btn in buttons" @click="onClick(btn.cmd)">
        <i :class="btn.iconClass"></i>
        <div class="flex-btn-text">{{btn.text}}</div>
    </div>
</div>`

// Data
//
function data() {
    return {
        buttons: [
            { text: "Circle", iconClass: "bi bi-circle"    , cmdName: "circle" },
            { text: "Line",   iconClass: "bi bi-slash-lg"  , cmdName: "line"   },
            { text: "Text",   iconClass: "bi bi-textarea-t", cmdName: "text"   },
            { text: "Image",  iconClass: "bi bi-image"     , cmdName: "image"  }
        ]
    }
}

// Export component
//
export default {
    data,
    template,
    components: {
        ToolbarButton
    }
}