<script>
  import { gpioPins } from "../gpioPins.js";
  import { GPIO } from "../stores.js";

  function toggleGPIO(gpioPin, atIndex) {
    gpioPin.data.update((n) => (n == 0 ? 1 : 0));
  }
</script>

<div class="card">
{#each gpioPins as gpioPin, i}
  <div class="card-compact gpio grid grid-cols-3">
    <p class="">{gpioPin.label}</p>
    <btn
      class=""
      on:click={() => {
                  toggleGPIO(gpioPin, i);
                }}
    >
      {$GPIO[i] === 0 ? "⚫" : "🟢"}
    </btn>
  </div>
{/each}
</div>

<style>
  .gpio {
    text-align: center;
  }
</style>