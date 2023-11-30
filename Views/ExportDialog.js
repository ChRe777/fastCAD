// batch.js

// Import
//
import { useStore } from 'stores/store'
import api from 'services/api'

// SVG Icons see https://www.svgrepo.com/

// Template
//

const body = `
    <div class="d-flex flex-row justify-content-center gap-3">

        <div class="card" style="width: 17rem;">
            <div class="p-4">
                <img src="/Assests/Image/svg.svg" class="card-img-top" alt="svg"/>
            </div>
            <div class="card-body">
                <h5 class="card-title">SVG</h5>
                <p class="card-text">Exports the scene in SVG Format so you can use anywhere.</p>
                <a :href="hrefSVG" :download="downloadSVG" class="btn btn-primary">Export as SVG</a>
            </div>
        </div>

        <div class="card" style="width: 17rem;">
            <div class="p-4">
                <img src="/Assests/Image/json.svg" class="card-img-top" alt="svg"/>
            </div>
            <div class="card-body">
                <h5 class="card-title">JSON</h5>
                <p class="card-text">Export the scene as JSON Format so you can Import it again.</p>
                <a :href="hrefJSON" :download="downloadJSON" class="btn btn-primary">Export as JSON</a>
            </div>
        </div>

    </div>
`

const template = `
<div ref="export-modal" id="export-modal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-md">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Export</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            ` + body + `
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
`

// prepareExportJSON
//
function prepareExportJSON() {
    const blob = api.getBlobJSON()
    this.hrefJSON = window.URL.createObjectURL(blob)
    this.downloadJSON = "scene.json" // TODO: Name of Project
}

// prepareExportSVG
//
function prepareExportSVG() {
    const blob = api.getBlobSVG()
    this.hrefSVG = window.URL.createObjectURL(blob)
    this.downloadSVG = "scene.svg" // TODO: Name of Project
}


// Data
//
function data() {
    return {
        store: useStore(),
        modal: null,
        // SVG
        hrefSVG: "",
        downloadSVG: "",
        // JSON
        hrefJSON: "",
        downloadJSON: ""
    }
}

// Components
//
export default {
    data,
    template,
    watch: {
        'store.showExport'() {
            this.modal.show()
            this.prepareExportSVG()
            this.prepareExportJSON()
        }
    },
    methods: {
        prepareExportSVG,
        prepareExportJSON
    },
    mounted() {
        this.modal = new bootstrap.Modal(this.$refs['export-modal'], {
            keyboard: false
        })
    }

}