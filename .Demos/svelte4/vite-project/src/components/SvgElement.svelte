<svelte:options namespace="svg" />

<script context="module">
    // see https://svelte.dev/docs/svelte-components#script-context-module

    let totalNodes = 0;

    // the export keyword allows this function to imported with e.g.
    // `import Example, { alertTotal } from './Example.svelte'`
    export function alertTotal() {
        alert(totalNodes);
    }

    export function getTotalNodes() {
        return totalNodes;
    }
</script>

<script>
    // Docu:
    //
    // see https://svelte.dev/examples/svelte-element
    //
    // Example:
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

    // Imports
    //
    import SvgElement from "./SvgElement.svelte";

    /** @param {SceneNode} node */
    export let node;

    totalNodes++;
    console.log(`total number of node: ${totalNodes}`);
</script>

{#if node.type === "#text"}
    {node.attributes.data}
{:else}
    <svelte:element this={node.type} {...node.attributes}
        >{#each node.childs as child}
            <SvgElement node={child} />
        {/each}
    </svelte:element>
{/if}

<style>
    /*
        NO LOCAL STYLES
    */
</style>
