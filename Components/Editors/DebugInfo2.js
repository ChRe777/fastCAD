// debug.js

// Imports
//
import { useSelectionStore } from 'stores/selection'


// Template
//
const template = `
<h5 class="mt-2">Debug Info</h5>
<div class="container bg-light mt-2 rounded-1">
    selected: {{this.selectionStore.selectedElements.map(el => el.type)}}
</div>
`

// Data
//
function data() {
    return {
        selectionStore: useSelectionStore()
    }
}

// Export component
//
export default {
    data,
    template
}