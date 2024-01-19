<script>
    import Circle from "./Circle.svelte";
    import Rect from "./Rect.svelte";

    let selected = Circle;
    let attrs = {
        "stroke-width": 2,
        "stroke": blue
    }
</script>

<!-- PERHAPS THIS IS THE SOLUTION -->
<svg viewbox="0 0 200 200">
    <svelte:component this={selected} {...attrs}/>
</svg>

<button on:click={() => (selected = Rect)}> Make it square </button>
<button on:click={() => (selected = Circle)}> Make it circle </button>

<style>
    :global(svg) {
        max-width: 500px;
        display: block;
    }
</style>
