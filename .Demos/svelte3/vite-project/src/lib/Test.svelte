<script>
    // Imports
    //
    import { count, elapsed } from "../store/store.js";

    // Props
    //
    export let foo;
    // Values that are passed in as props
    // are immediately available
    console.log({ foo });

    // Private State vars
    let arr = [1, 2];

    // Functions
    //
    function updateArray() {
        let last = arr.slice(-1)[0];
        arr.push(last + 1);
        arr = arr; // Assign array to update
    }
</script>

<!-- markup (zero or more items) goes here -->
<p>{foo}</p>
<button on:click={updateArray}>Update</button>

<p>{arr}</p>
<p class="red">Count: {$count}, Time elapsed: {$elapsed} ms</p>

<style>
    .red {
        color: #ad1010;
    }
    /* styles go here */
</style>
