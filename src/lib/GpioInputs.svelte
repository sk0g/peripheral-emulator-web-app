<script>
  import { gpioPins } from "../gpioPins.js";
  import { GPIO } from "../stores.js";

  function toggleGPIO(gpioPin, atIndex) {
    gpioPin.data.update((n) => (n == 0 ? 1 : 0));
  }
</script>

<h1 class="text-center">Device Input</h1>
{#each gpioPins as gpioPin, i}
  <button
    class="btn btn-sm btn-active btn-block {$GPIO[i] <= .1 ? '' : 'btn-accent'}"
    on:click={() => {
                  toggleGPIO(gpioPin, i);
                }}
  >
    {gpioPin.label}
  </button>
  <div class="h-1"></div>
{/each}

