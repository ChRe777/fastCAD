<svelte:options namespace="svg" />

<script>
    /** Import */
    import SvgNode from "./SvgElement.svelte";

    /** @type {SceneNode} */
    export let node;
</script>

<svelte:element this={node.type} {...node.attributes}>
    {#each node.childs as childNode}
        <SvgNode node={childNode} />
    {/each}
</svelte:element>
