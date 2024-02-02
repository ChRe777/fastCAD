<script>
    // Store
    //
    import appStore from "../stores/AppStore.js";
    import { loadScene } from "../stores/AppStore.js";

    // Components
    //
    import SvgElement from "./SvgElement.svelte";
</script>

<h1>Scene</h1>

<svg
    viewBox={$appStore.scene.viewBox}
    width={$appStore.scene.width}
    height={$appStore.scene.height}
    xmlns="http://www.w3.org/2000/svg"
>
    {#each $appStore.scene.childs as child}
        <SvgElement node={child} />
    {/each}
</svg>

<br />
<button on:click={() => loadScene()}>Load Scene</button>

<style>
    :global(svg) {
        display: block;
        background-color: black;
    }
</style>
