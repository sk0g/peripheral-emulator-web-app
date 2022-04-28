<script>
  import { selectedComponent } from "../configStore.js"
  import SevenSegmentDisplay from "./SevenSegmentDisplay.svelte"
  import UltrasonicSensor from "./UltrasonicSensor.svelte"
  import LedComponent from "./LedComponent.svelte"
</script>

<div class="flex flex-col">
  <div class="tabs justify-center">
    <p class="tab tab-bordered {$selectedComponent === 'LED' ? 'tab-active': ''}"
       on:click={() => $selectedComponent = "LED"}>LED</p>
    <p class="tab tab-bordered {$selectedComponent === 'SevenSegmentDisplay' ? 'tab-active': ''}"
       on:click={() => $selectedComponent = "SevenSegmentDisplay"}>7-segment display</p>
    <p class="tab tab-bordered {$selectedComponent === 'UltrasonicSensor' ? 'tab-active' : ''}"
       on:click={() => $selectedComponent = "UltrasonicSensor"}>Ultrasonic sensor</p>
  </div>

  <div class="card card-bordered shadow-xl my-5 py-2 px-5">
    {#if $selectedComponent === 'LED'}
      <LedComponent />
    {:else if $selectedComponent === 'SevenSegmentDisplay'}
      <SevenSegmentDisplay />
    {:else if $selectedComponent === 'UltrasonicSensor'}
      <UltrasonicSensor />
    {/if}
  </div>
</div>
