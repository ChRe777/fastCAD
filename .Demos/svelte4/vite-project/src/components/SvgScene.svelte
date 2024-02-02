<!-- STYLE -->

<script>
    // Store
    //
    import appStore from "../stores/AppStore.js";
    import { loadScene, storeScene } from "../stores/AppStore.js";
    import { getTotalNodes } from "./SvgElement.svelte";

    // Components
    //
    import SvgRoot from "./SvgRoot.svelte";
</script>

<!-- TEMPLATE -->
<h1>Scene</h1>
<SvgRoot node={$appStore.scene}></SvgRoot>
<button on:click={() => loadScene()}>Load Scene</button>
<button on:click={() => storeScene()}>Store Scene</button>
<div>Total Nodes: {getTotalNodes()}</div>

<style>
    :global(svg) {
        display: block;
        background-color: black;
    }
</style>
