//
// editor.js
//

// Imports
//
import { useSelectionStore } from 'stores/selection'

// see https://dmitripavlutin.com/ecmascript-modules-dynamic-import/
//
// Editors
//
import CommonEditor from 'editors/common'
import LineEditor from 'editors/line'
import CircleEditor from 'editors/circle'
import TextEditor from 'editors/text'
import ImageEditor from 'editors/image'
import PolylineEditor from 'editors/polyline'
import PolygonEditor from 'editors/polygon'
import PathEditor from 'editors/path'
import LayerEditor from 'editors/layer'
//
import Debug from 'editors/debug'

// Toolbar
//
import Toolbar from 'components/toolbar'

// Template
//
const template = `
<div class="p-2">

    <div id="toolbar">
        <toolbar v-if="isNoSelection"></toolbar>
    </div>

    <circle-editor        v-if="typeSelected === 'circle'"  ></circle-editor>
    <line-editor     v-else-if="typeSelected === 'line'"    ></line-editor>
    <text-editor     v-else-if="typeSelected === 'text'"    ></text-editor>
    <image-editor    v-else-if="typeSelected === 'image'"   ></image-editor>
    <polyline-editor v-else-if="typeSelected === 'polyline'"></polyline-editor>
    <polygon-editor  v-else-if="typeSelected === 'polygon'" ></polygon-editor>
    <path-editor     v-else-if="typeSelected === 'path'"    ></path-editor>
    <common-editor        v-if="typeSelected !== undefined" ></common-editor>

    <div class="mt-2">
        <layer-editor></layer-editor>
    </div>

    <debug></debug>

</div>
`

// Used componenets
//
const components = {
    //
    CommonEditor,
    LineEditor,
    CircleEditor,
    TextEditor,
    ImageEditor,
    PolylineEditor,
    PolygonEditor,
    PathEditor,
    //
    LayerEditor,
    //
    Toolbar,
    //
    Debug
}

// Data
//
function data() {
    return {
        selectionStore: useSelectionStore(),
    }
}

// Computed Attributes
//
function typeSelected() {
    if (this.selectionStore.selectedElementsSet.size === 0) {
        return undefined
    } else if (this.selectionStore.selectedElementsSet.size === 1) {
        const type = Array.from(this.selectionStore.selectedElementsSet)[0].type
        return type
    } else {
        return 'multi'
    }
}

function isNoSelection() {
    return this.selectionStore.selectedElementsSet.size === 0
}

// Export module
//
export default {
    data,
    components,
    template,
    computed: {
        typeSelected,
        isNoSelection
    }
}