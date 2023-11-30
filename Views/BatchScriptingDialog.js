// batch.js

// Import
//
import { useStore } from 'stores/store'
import { interpret } from 'services/interpreter'

// Template
//
const body = `

<div class="input-group">
  <span class="input-group-text" style="width:80px">JScript</span>
  <textarea class="form-control" v-model="javaScript" aria-label="javascript textarea" rows="7"></textarea>
</div>

<div class="text-center w-100 p-3 border border-light">
    <button type="button" class="btn btn-primary" @click="onRunJavaScript"><i class="bi bi-arrow-down-circle-fill"></i> Create Script <i class="bi bi-arrow-down-circle-fill"></i></button>
</div>

<div class="input-group">
  <span class="input-group-text" style="width:80px">Script</span>
  <textarea class="form-control" v-model="script" aria-label="script textarea" rows="7"></textarea>
</div>
`

const template = `
<div ref="batch-modal" id="batch-modal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-lg modal-fullscreen-md-down">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Batch Scripting</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            `+ body + `
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="onRunScript">Run <i class="bi bi-play-fill"></i></button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
`

function onRunScript() {
    let lines = this.script.split('\n')
    lines.forEach(line => {

        try {
            interpret(line)
        } catch (error) {
            console.log(error, line)
        }

    })
}

function onRunJavaScript() {
    let result = new Function(this.javaScript)()
    this.script = result
}

// see https://www.programiz.com/javascript/online-compiler/
//
const exampleScript = [
    "const center_x = 0",
    "const center_y = 0",
    "const radius = 50",
    "const segments = 12",
    "",
    "let result = (`circle ${center_x},${center_y} ${radius}\\n`)",
    "result += (`set fill #ff0000\\n`)",
    "",
    "for (let i = 0; i < segments; i++) {",
    "   const angle = (2 * Math.PI * i) / segments",
    "   const x = center_x + radius * Math.cos(angle)",
    "   const y = center_y + radius * Math.sin(angle)",
    "",
    "   result += (`line ${center_x},${center_y} ${x},${y}\\n`)",
    "   result += (`set stroke #ffffff\\n`)",
    "}",
    "",
    "return result"
].join("\n")

// Data
//
function data() {
    return {
        store: useStore(),
        script: '',
        javaScript: exampleScript,
        modal: null
    }
}

// Components
//
export default {
    data,
    template,
    watch: {
        'store.showBatch'() {
            this.modal.show()
        }
    },
    methods: {
        onRunScript,
        onRunJavaScript
    },
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs['batch-modal'], {
            keyboard: false
        })
    }

}