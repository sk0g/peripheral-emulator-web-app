<script>
  import { isDebug } from "../configStore.js";
  import SerialConnector from "./SerialConnector.svelte";
</script>

<div
  class="flex place-content-center sticky top-0 -mx-7 z-50"
  style:background-color={$isDebug == 'true'
        ? "rgba(253, 187, 116, 0.6)"
        : "rgba(94, 234, 212, 0.6)"}
>

    <button class="px-2 hover:bg-orange-300" on:click={() => $isDebug='true'}>Debug</button>
    <h1 class="m-2">|</h1>
    <button class="px-2 hover:bg-teal-300" on:click={() => $isDebug='false'}>Device</button>

  {#if $isDebug == 'false'}
    <SerialConnector></SerialConnector>
  {/if}
</div>

<style>

</style>
