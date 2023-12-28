<script>
    let a = 0;
    let b = 0;
    let total = 0;

    async function add() {
        const response = await fetch("/API/add", {
            method: "POST",
            body: JSON.stringify({ a, b }),
            headers: {
                "content-type": "application/json",
            },
        });

        total = await response.json();
    }
</script>

<h3>Add numbers</h3>

<input type="number" bind:value={a} /> +
<input type="number" bind:value={b} /> =
{total}

<button class="btn btn-primary" on:click={add}>Calculate</button>
