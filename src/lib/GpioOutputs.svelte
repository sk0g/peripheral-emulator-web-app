<script>
  import { picoGpioPins } from "../gpio.js"
  import { GPIO } from "../gpioStores.js"
</script>

<h1 class="text-center">Device Outputs</h1>
{#each picoGpioPins.filter(p => p.usable && !p.isInput) as pin}
  <button
    class="btn btn-sm btn-block {$GPIO[pin.gpioNumber] <= 0.5 ? 'btn-inactive' : 'btn-accent'}"
    on:click={() => pin.updateValue($GPIO[pin.gpioNumber] <= 0.5 ? 1 : 0)}
  >
    GPIO {pin.gpioNumber}
  </button>
  <div class="h-1"></div>
{/each}
