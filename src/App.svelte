<script>
  import Header from "./lib/Header.svelte"
  import GpioInputs from "./lib/GpioInputs.svelte"
  import PeripheralSelector from "./lib/PeripheralSelector.svelte"
  import GpioOutputs from "./lib/GpioOutputs.svelte"
</script>

<html data-theme="coffee" lang="en-AU">
<main>
  <div class="container mx-auto">
    <Header />
    <div class="grid grid-cols-6 py-4 gap-4">
      <div class="col-span-1 basis-1/4 px-2">
        <GpioInputs />
      </div>
      <div class="col-span-4">
        <PeripheralSelector></PeripheralSelector>
      </div>
      <div class="col-span-1">
        <GpioOutputs />
      </div>
    </div>
  </div>
</main>
</html>