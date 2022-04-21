<script>
  var modeIsDebug = true;

  function setDebug() {
    modeIsDebug = true;
    console.log("Set run mode to Debug")
  }

  function setPhysicalDevice() {
    modeIsDebug = false;
    console.log("Set run mode to Device")
  }
</script>

<div
    style:background-color={modeIsDebug
        ? "rgba(253, 187, 116, 0.6)"
        : "rgba(94, 234, 212, 0.6)"}
    class="flex place-content-center sticky top-0 -mx-7 z-50"
>
  <button on:click={setDebug} class="px-2 hover:bg-orange-300">Debug</button>
  <h1 class="m-2">|</h1>
  <button on:click={setPhysicalDevice} class="px-2 hover:bg-teal-300"
  >Device
  </button
  >
</div>

<style>
</style>
