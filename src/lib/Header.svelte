<script>
    var modeIsDebug = true;

    function setDebug() {
        modeIsDebug = true;
    }

    function setPhysicalDevice() {
        modeIsDebug = false;
    }
</script>

<div
    style:background-color={modeIsDebug
        ? "rgba(253, 187, 116, 0.6"
        : "rgba(94, 234, 212, 0.6)"}
    class="bar flex place-content-center -mx-10"
>
    <button on:click={setDebug} class="px-2 hover:bg-orange-300">Debug</button>
    <h1 class="m-2">|</h1>
    <button on:click={setPhysicalDevice} class="px-2 hover:bg-teal-300"
        >Device</button
    >
</div>

<style>
</style>
