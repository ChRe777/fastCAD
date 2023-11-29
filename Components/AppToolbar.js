// apptoolbar.js
//

// Import
//
import ToolbarButton from 'parts/button'

// Template
//
const template = `
<div class="d-flex flex-column gap-2">
    <template v-for="btn in buttons">
        <toolbar-button :iconClass="btn.iconClass" :text="btn.text" :cmdName="btn.cmdName"></toolbar-button>
    </template>
</div>`

// Data
//
function data() {

    return {
        buttons: [
            { text: "Load",     iconClass: "bi bi-folder-fill",          cmdName: "load" },
            { text: "Save",     iconClass: "bi bi-floppy-fill",          cmdName: "save" },
            { text: "Export",   iconClass: "bi bi-cloud-download-fill",  cmdName: "export"},
            { text: "Settings", iconClass: "bi bi-gear-fill",            cmdName: "settings"},
            { text: "Batch",    iconClass: "bi bi-chat-right-text-fill", cmdName: "batch"}
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