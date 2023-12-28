<script>
    // Imports
    //
    import Element from "./Element.svelte";

    // Props
    //
    export let attrs;

    function getAttrs() {
        return `x1="0" y1="0" x2="90" y2="90"`;
    }

    let lineStr =
        "<svg:line x1='0' y1='0' x2='90' y2='90' stroke='green'></svg:line>";

    let tag = attrs.type;
</script>

{#if attrs.type === "line2"}
    <svelte:element this={tag} {...attrs}></svelte:element>
    {@html "<line x1=0 y1=0 x2=70 y2=70 />"}
    {@html "<" + attrs.type + " " + getAttrs() + ">" + "</" + attrs.type + ">"}
    {@html lineStr}

    <!-- 
        LINE 
    -->
{:else if attrs.type === "line"}
    <line {...attrs}></line>
    <!-- 
        CIRCLE 
    -->
{:else if attrs.type === "circle"}
    <circle {...attrs}></circle>
    <!-- 
        RECT 
    -->
{:else if attrs.type === "rect"}
    <rect {...attrs}></rect>
    <!-- 
        LAYER 
    -->
{:else if attrs.type === "layer"}
    <g {...attrs}>
        {#each attrs.items as item}
            <Element attrs={item} />
        {/each}
    </g>
{:else}
    <!-- NOTHING -->
{/if}

<style>
</style>
