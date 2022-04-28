<script>
  import { picoGpioPins } from "../gpio.js"
  import { GPIO } from "../gpioStores.js"
</script>

<h1 class="text-center">Device Input</h1>
{#each picoGpioPins as pin}
  {#if pin.usable && pin.isInput}
    <button
      class="btn btn-sm btn-block {$GPIO[pin.gpioNumber] <= 0.1 ? 'btn-active' : 'btn-accent'}"
      on:click={() => {
      pin.setValue($GPIO[pin.gpioNumber] <= 0.1 ? 1 : 0); console.log($GPIO)
    }}>
      GPIO {pin.gpioNumber}
    </button>
    <div class="h-1"></div>
  {/if}
{/each}

