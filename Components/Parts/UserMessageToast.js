// toast.js

// Template
//
const header = `
<i :class="iconClass"></i>
<strong class="me-auto">{{type}}</strong>
<small>{{time}}</small>
<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
`

const template = `
<div :id="id" :ref="id" class="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">${header}</div>
    <div class="toast-body">{{text}}</div>
</div>
`

// Mounted
//
function mounted() {
    this.toast = new bootstrap.Toast(this.$refs[this.id])
    setTimeout(() => this.toast.hide(), 2000)
}

// Data
//
function data() {
    return {
        toast: null,
        type: 'Information',
        time: '11 mins ago',
        iconClass: 'bi bi-info-square-fill' + ' ' + 'me-1 text-primary fs-5'
    }
}

// Component
//
export default {
    props: ["id", "text"],
    data,
    template,
    mounted
}