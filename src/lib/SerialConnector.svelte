<script>
  import { fade } from "svelte/transition"

  import { serialConfBaudRate, serialConfFlowControl, serialConfParity, serialConfStopBits } from "../stores.js"
  import { connectToSerial, disconnectSerial, testWrite } from "./serialConnection.js"
</script>

<div class="serial-conf" transition:fade>
  <div class="dropdown dropdown-end">
    <label class="btn p-1 btn-secondary" tabindex="0">Configure Serial</label>
    <div class="dropdown-content menu px-2 shadow bg-secondary text-secondary-content rounded-box w-52"
         tabindex="0">
      <div class="divider divider-vertical">Baud Rate</div>
      <select bind:value={$serialConfBaudRate} class="select select-primary select-sm" id="baud"
              name="Baud Rate">
        <option value="115200">115200</option>
        <option value="57600">57600</option>
        <option value="38400">38400</option>
        <option value="28800">28800</option>
        <option value="14400">14400</option>
        <option value="19200">19200</option>
        <option value="9600">9600</option>
      </select>

      <div class="divider divider-vertical">Stop Bits</div>
      <select bind:value={$serialConfStopBits} class="select select-primary select-sm" id="stopBits" name="Stop Bits">
        <option value="1">1</option>
        <option value="2">2</option>
      </select>

      <div class="divider divider-vertical">Parity</div>
      <select bind:value={$serialConfParity} class="select select-primary select-sm" id="parity" name="Parity">
        <option value="none">none</option>
        <option value="even">even</option>
        <option value="odd">odd</option>
      </select>

      <div class="divider divider-vertical">Flow Control</div>
      <select bind:value={$serialConfFlowControl} class="select select-primary select-sm" id="flowControl"
              name="Flow Control">
        <option value="none">none</option>
        <option value="hardware">hardware</option>
      </select>
      <div class="py-1.5"></div>
    </div>
  </div>
  <div class="divider divider-horizontal"></div>
  <div>
    <button class="btn btn-primary" on:click={disconnectSerial}>
      Disconnect
    </button>
    <button class="btn btn-primary" on:click={testWrite}>
      TestWrite
    </button>
    <button class="btn btn-primary" on:click={connectToSerial}>
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