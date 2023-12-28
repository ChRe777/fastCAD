<script>
    import { count, scene, elapsed } from "../store/store.js";

    const newCircle = (ri) => {
        return {
            type: "circle",
            cx: 50,
            cy: 50,
            r: ri * 5,
        };
    };

    function newLine(r, alpha) {
        return {
            type: "line",
            x1: r * Math.cos(alpha),
            y1: r * Math.sin(alpha),
            x2: r * Math.cos(alpha + Math.PI),
            y2: r * Math.sin(alpha + Math.PI),
            stroke: "yellow",
        };
    }

    function increment() {
        $count += 1;

        const start = performance.now();
        for (const x of Array(10).keys()) {
            let alpha = (x * 10 * Math.PI) / 180;
            $scene.items.push(newLine(50, alpha));
        }

        $scene.items = $scene.items;
        const end = performance.now();
        $elapsed = end - start;
        console.log(`Execution time: ${end - start} ms`);
    }

    let lineStr = "<div>HELLO</div>";
</script>

<button on:click={increment}>
    count is {$count}
</button>

{@html lineStr}
