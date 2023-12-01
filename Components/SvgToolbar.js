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
        <toolbar-button :iconClass="btn.iconClass" style="width: 72px; height: 72px; font-size: 0.9rem;" :text="btn.text" :cmdName="btn.cmdName"></toolbar-button>
    </template>
</div>`

// Data
//
function data() {
    return {
        buttons: [
            { text: "Circle", iconClass: "bi bi-circle", cmdName: "circle" },
            { text: "Line", iconClass: "bi bi-slash-lg", cmdName: "line" },
            { text: "Text", iconClass: "bi bi-textarea-t", cmdName: "text" },
            { text: "Image", iconClass: "bi bi-image", cmdName: "image" },
            { text: "Path", iconClass: "bi bi-bezier", cmdName: "path" },
            { text: "Polyline", iconClass: "bi bi-activity", cmdName: "polyline" },
            { text: "Polygon", iconClass: "bi bi-hexagon-fill", cmdName: "polygon" },
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