// debug.js

// Imports
//
import { useSelectionStore } from 'stores/selection'


// Template
//
const template = `
<h5 class="mt-2">Debug Info</h5>
<div class="container bg-light mt-2 rounded-1">
    selected: {{selectedTypes}}
</div>
`

// Data
//
function data() {
    return {
        selectionStore: useSelectionStore()
    }
}

// Component
//
export default {
    data,
    template,
    computed: {
        selectedTypes() {
            let res = []
            this.selectionStore.selectedElementsSet.forEach(el => res.push(el.type))
            return res
        }
    }
}