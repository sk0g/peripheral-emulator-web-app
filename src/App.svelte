<script>
  import Header from "./lib/Header.svelte";
  import { GPIO } from "./stores.js";
  import GpioView from "./lib/GpioView.svelte";
  import PeripheralSelector from "./lib/PeripheralSelector.svelte";
</script>

<html data-theme="garden">
<main>
  <div class="container">
    <Header />
    <div class="grid grid-cols-4 py-4">
      <div class="col-span-1 basis-1/4 px-2">
        <GpioView />
      </div>
      <div class="col-span-2">
        <PeripheralSelector></PeripheralSelector>
      </div>
      <div class="col-span-1">{$GPIO}</div>
    </div>
  </div>
</main>
</html>