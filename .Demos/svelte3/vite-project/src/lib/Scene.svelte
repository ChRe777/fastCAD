<script>
    import { scene } from "../store/store.js";
    import Element from "./Element.svelte";
</script>

<svg
    viewBox="-150 -100 300 200"
    width="300"
    height="200"
    xmlns="http://www.w3.org/2000/svg"
>
    <g class="foo">
        {#each $scene.items as item}
            <Element attrs={item} />
        {/each}
    </g>
</svg>

<style>
    svg {
        background-color: black;
    }

    .foo {
        fill: none;
        stroke: white;
        stroke-width: 1;
        stroke-dasharray: 3;
    }
</style>
