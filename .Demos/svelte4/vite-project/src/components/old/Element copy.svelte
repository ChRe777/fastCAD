<svelte:options namespace="svg" />

<script>
    // Imports
    //
    import Element from "./SvgElement.svelte";

    // Props
    //
    export let attrs;

    let tag = attrs.type;
    let elements = attrs.elements;

    console.log("tag", tag);
</script>

{#if tag !== "layer"}
    <!-- https://svelte.dev/examples/svelte-element -->
    <svelte:element this={attrs.type} {...attrs}></svelte:element>
{:else if tag === "image"}
    <image {...attrs}></image>
{:else if tag === "line2"}
    <line {...attrs}></line>
{:else if tag === "polyline"}
    <polyline {...attrs}></polyline>
{:else if tag === "circle"}
    <circle {...attrs}></circle>
{:else if tag === "rect"}
    <rect {...attrs}></rect>
{:else if tag === "path"}
    <path {...attrs}></path>
{:else if tag === "text"}
    <text {...attrs}>{attrs.text}</text>
{:else if tag === "layer"}
    <g {...attrs}>
        {#each elements as element}
            <Element attrs={element} />
        {/each}
    </g>
{:else}
    <!-- NOTHING -->
{/if}

<style>
</style>
