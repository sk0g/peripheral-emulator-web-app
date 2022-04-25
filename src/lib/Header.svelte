<script>
  import { isDebug } from "../configStore.js"
  import SerialConnector from "./SerialConnector.svelte"
</script>

<div
  class="navbar flex flex-row w-full place-content-between
{$isDebug == 'true' ? 'bg-accent-content': 'bg-primary-focus'} text-accent"
>

  <div class="place-content-center">
    <button class="px-2 hover:bg-accent-content" on:click={() => $isDebug='true'}>Debug</button>
    <div class="divider divider-horizontal"></div>
    <button class="px-2 hover:bg-primary-focus" on:click={() => $isDebug='false'}>Device</button>
  </div>

  {#if $isDebug == 'false'}
    <SerialConnector></SerialConnector>
  {/if}
</div>
