<script>
  import { fade } from "svelte/transition";

  import { baudRate } from "../configStore.js";
</script>

<div class="serial-conf h-1/2" transition:fade>
  <div class="serial-option">
    Baud Rate
    <select bind:value={$baudRate} id="baud" name="Baud Rate">
      <option value="115200">115200</option>
      <option value="57600">57600</option>
      <option value="38400">38400</option>
      <option value="28800">28800</option>
      <option value="14400">14400</option>
      <option value="19200">19200</option>
      <option value="9600">9600</option>
    </select>
  </div>
  <div>
    <button class="rounded">
      Connect
    </button>
  </div>
</div>

<style>
  .serial-option {
    --tw-border-opacity: .75;
    border-color: rgb(156 163 175 / var(--tw-border-opacity));
    border-width: 1px;
    border-radius: .5rem;
    padding: 0.25rem 0.5rem;
  }

  .serial-conf {
    display: flex;
    align-items: baseline;
    justify-content: end;
    flex: 0 1 auto;
    flex-flow: row nowrap;
  }
</style>