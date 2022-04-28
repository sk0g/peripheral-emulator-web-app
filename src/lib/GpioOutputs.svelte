<script>
  import { picoGpioPins } from "../gpio.js"
</script>

<h1 class="text-center">Device Outputs</h1>
{#each picoGpioPins as pin}
  {#if pin.usable && !pin.isInput}
    <button
      class="btn btn-sm btn-block {pin.value <= .1 ? 'btn-inactive' : 'btn-accent'}"
    >
      GPIO {pin.gpioNumber}
    </button>
    <div class="h-1"></div>
  {/if}
{/each}
