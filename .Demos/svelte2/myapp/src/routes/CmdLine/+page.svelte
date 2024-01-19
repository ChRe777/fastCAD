<script>
    let cmdText = "";
    let cmdTextPlaceHolder = "enter a command";
    let styleBorder = "border border-1 rounded";
    let output = "empty";
    let cmds = ["line", "circle"];
    let debug = true;
    // TODO
    let allowChars = ["a", "b", "l", "i"];

    function onKeyDown(event) {
        output = "";

        const element = event.target;
        const i = element.selectionStart;
        const j = element.selectionEnd;

        let cmd = event.target.value;

        if (event.key === "Backspace") {
            if (i === j) {
                cmd = cmd.slice(0, -1);
            } else {
                cmd = cmd.slice(0, i) + cmd.slice(j, cmd.length);
            }
        }

        if (allowChars.includes(event.key)) {
            cmd = cmd + event.key;
        }

        output = cmd;

        const count = cmd.length;

        if (count === 0) cmdTextPlaceHolder = "enter a command";
        if (count === 1) cmdTextPlaceHolder = "";
        if (count >= 2) {
            cmdTextPlaceHolder = "";
            let suggestion = cmds.find((x) => x.startsWith(cmd));
            if (suggestion) {
                cmdTextPlaceHolder = suggestion;
                if (event.key === "Tab") {
                    event.preventDefault();
                    event.target.value = suggestion;
                }
            }
        }

        if (event.key === "Enter") {
            if (cmd === "line") {
                output = "line was called";
            }
        }
    }
</script>

<h3 class="mt-1 mb-3">Command Line</h3>

<div class="position-relative">
    <input
        type="text"
        class="form-control bg-transparent m-0 shadow-none border-light-subtle"
        bind:value={cmdText}
        on:keydown|stopPropagation={onKeyDown}
    />
    <input
        type="text"
        class="form-control z-n1 position-absolute top-0 start-0 border-1"
        placeholder={cmdTextPlaceHolder}
    />
</div>

{#if debug}
    <textarea class="w-100 {styleBorder} mt-2 text-start p-1">{output}</textarea
    >
{/if}

<style>
</style>
