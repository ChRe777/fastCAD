// info.js

// Template
//
const template = `
<span 
    :id="id"
    :ref="id"
    @click.stop=""
     class="badge rounded-pill"
    :class="[active ? 'bg-white text-primary' : 'bg-primary text-white']"
     data-bs-toggle="tooltip" 
     data-bs-placement="right" 
    :data-bs-title="text"
>
    <i class="bi bi-info-circle"></i>
</span>
`

// data
//
function data() {
    return {
        toolTip: null
    }
}

// Component
//
export default {
    props: ['id', 'active', 'text'],
    data,
    template,
    mounted() {
        console.log("mounted info tooltip", this.$refs[this.id])
        this.toolTip = new bootstrap.Tooltip(this.$refs[this.id])
    }
}
