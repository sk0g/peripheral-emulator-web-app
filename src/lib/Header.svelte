<script>
  import { isDebug } from "../stores.js"
  import SerialConnector from "./SerialConnector.svelte"
</script>

<div
  class="navbar flex flex-row w-full place-content-between bg-primary text-accent"
>

  <div class="place-content-center">
    <button class="btn {$isDebug == 'true' ? 'btn-accent': 'btn-primary'} px-2" on:click={() => $isDebug='true'}>Debug
    </button>
    <div class="divider divider-horizontal"></div>
    <button class="btn {$isDebug == 'true' ?  'btn-primary': 'btn-accent'} px-2" on:click={() => $isDebug='false'}>
      Device
    </button>
  </div>

  {#if $isDebug == 'false'}
    <SerialConnector></SerialConnector>
  {/if}
</div>
