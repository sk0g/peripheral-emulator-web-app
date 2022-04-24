<script>
  import { gpioPins } from "../gpioPins.js";
  import { GPIO } from "../stores.js";
</script>

<h1 class="text-center">Device Outputs</h1>
{#each gpioPins as gpioPin, i}
  <button
    class="btn btn-sm btn-active btn-block {$GPIO[i] <= .1 ? '' : 'btn-accent'}"
  >
    {gpioPin.label}
  </button>
  <div class="h-1"></div>
{/each}

