<script>
  import Header from "./lib/Header.svelte";

  import {gpioPins} from "./gpioPins";

  import {GPIO} from "./stores";
  import SevenSegmentDisplay from "./lib/SevenSegmentDisplay.svelte";

  function toggleGPIO(gpioPin, atIndex) {
    gpioPin.data.update((n) => (n == 0 ? 1 : 0));
  }
</script>

<main>
  <div class="container mx-auto">
    <Header/>
    <div class="flex flex-row basis-4 py-4">
      <div class="grid-cols-1 basis-1/4 px-2">
        <div class="basis-1/4">
          {#each gpioPins as gpioPin, i}
            <div class="gpio grid grid-cols-3">
              <p class="basis-1"/>
              <p class="basis-1">{gpioPin.label}</p>
              <button
                  class="basis-1"
                  on:click={() => {
                  toggleGPIO(gpioPin, i);
                }}
              >
                {$GPIO[i] === 0 ? "⚫" : "🟢"}
              </button>
            </div>
          {/each}
        </div>
      </div>
      <div class="basis-2/4">
        <SevenSegmentDisplay/>
      </div>
      <div class="basis-1/4">{$GPIO}</div>
    </div>
  </div>
</main>

<style>
  .gpio {
    border-style: double;
    border-radius: 9999px;
    border-width: 5px;
    text-align: center;
    background-color: rgba(253, 187, 116, 0.6);
  }
</style>
