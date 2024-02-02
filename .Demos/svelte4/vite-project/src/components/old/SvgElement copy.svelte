<svelte:options namespace="svg" />

<script>
    // Imports
    //
    import Element from "./SvgElement.svelte";

    // Props
    //
    export let attributes;

    // see https://svelte.dev/examples/svelte-element

    /*
    <type [attributes]>
        [childs]
    </type>

    e.g.

    <text x="10" y="30" class="small">
        You are
        <tspan>not</tspan>
        a banana!
    </text>

    <text x="10" y="30" class="small">
        <#text>You are</#text>
        <tspan>not</tspan>
        <#text>a banana!</#text>
    </text>

    */
</script>

{#if attributes.type === "layer"}
    <g {...attributes}>
        {#each attributes.elements as element}
            <Element attributes={element} />
        {/each}
    </g>
{:else}
    <svelte:element this={attributes.type} {...attributes}
        >{attributes.text ? attributes.text : ""}</svelte:element
    >
{/if}

<style>
    /*
        NO LOCAL STYLES
    */
</style>
