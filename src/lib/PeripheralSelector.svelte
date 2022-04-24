<script>
  import { selectedComponent } from "../configStore.js";
  import SevenSegmentDisplay from "./SevenSegmentDisplay.svelte";
  import UltrasonicSensor from "./UltrasonicSensor.svelte";
</script>

<div class="flex flex-col">
  <div class="tabs justify-center">
    <a class="tab tab-bordered {$selectedComponent === 'SevenSegmentDisplay' ? 'tab-active': ''}"
       on:click={() => $selectedComponent = "SevenSegmentDisplay"}>7-segment display</a>
    <a class="tab tab-bordered {$selectedComponent === 'UltrasonicSensor' ? 'tab-active' : ''}"
       on:click={() => $selectedComponent = "UltrasonicSensor"}>Ultrasonic sensor</a>
  </div>

  <div class="card card-bordered shadow-xl my-5 py-2 px-5">
    {#if $selectedComponent === 'SevenSegmentDisplay'}
      <SevenSegmentDisplay />
    {/if}
    {#if $selectedComponent === 'UltrasonicSensor'}
      <UltrasonicSensor />
    {/if}
  </div>
</div>
