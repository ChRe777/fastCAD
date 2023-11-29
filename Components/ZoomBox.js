// box.js
//

// Imports
//
import cmds from 'services/cmds'

// Template
//
const template = `
<div id="boxCentered" @click="onClick">
    <i :class="{'bi bi-zoom-in': zoomIn, 'bi bi-zoom-out': !zoomIn}"></i>
</div>
`

// Methods
//
function onKeyDown(ev, self) {
    if (ev.key == "Shift") {
        self.zoomIn = false
    }
}

function onKeyUp(ev, self) {
    if (ev.key == "Shift") {
        self.zoomIn = true
    }
}

function onClick() {
    if (this.zoomIn) {
        cmds.doCmdZoomIn()
    } else {
        cmds.doCmdZoomOut()
    }
}

// Data
//
function data() {
    return {
        zoomIn: true
    }
}

// Mounted
//
function mounted() {
    let self = this

    window.addEventListener('keydown', function (ev) {
        self.onKeyDown(ev, self)
    })

    window.addEventListener('keyup', function (ev) {
        self.onKeyUp(ev, self)
    })
}

// Export component
//
export default {
    data,
    template,
    methods: {
        onClick,
        onKeyDown,
        onKeyUp
    },
    mounted
}
