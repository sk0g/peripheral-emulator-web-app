<script>
  import { pinStores } from "../gpioStores.js"
  import { picoGpioPins } from "../gpio.js"
  import { onDestroy } from "svelte"
  import { ultrasonicAngle, ultrasonicDetectedDistance, ultrasonicInputPin, ultrasonicOutputPin } from "../stores.js"
  import { to_number } from "svelte/internal"
  import Ultrasonic2D from "./Ultrasonic2D.svelte"

  const centimetresPerMicrosecond = 0.034
  let distanceCentimetres = 100
  let pulseDurationMicroseconds = 1000

  $: {
    distanceCentimetres = to_number($ultrasonicDetectedDistance).toFixed(2)
  }

  function getFormattedDistance(d) {
    let calcDistance = distanceCentimetres

    if (calcDistance >= 100) {
      return `${(calcDistance / 100).toFixed(2)} m`
    }
    return `${calcDistance} cm`
  }

  function handleSliderInput(e) {
    ultrasonicAngle.update(v => v = to_number(e.target.value))
    return e.target.value
  }

  function getPulseDuration(d) {
    pulseDurationMicroseconds = d / centimetresPerMicrosecond * 2
    return pulseDurationMicroseconds < 1000 ? `${pulseDurationMicroseconds.toFixed()} μs` : `${(pulseDurationMicroseconds / 1000).toPrecision(3)} ms`
  }

  let unsub = pinStores[to_number($ultrasonicInputPin)].subscribe(v => {
    if (v > .5) {
      picoGpioPins[to_number($ultrasonicOutputPin)].pulseFor(pulseDurationMicroseconds)
    }
  })
  onDestroy(unsub)
</script>

<div class="flex flex-row place-content-between">
  <div class="dropdown dropdown-hover p-2 btn-error btn-sm rounded-2xl ">
    Trigger input pin: {$ultrasonicInputPin}
    <div class="dropdown-content menu p-2 px-10 bg-neutral-content rounded-b-box">
      {#each picoGpioPins.filter(p => p.usable && p.isInput) as pin}
        <p on:click={$ultrasonicInputPin.update(v => v = pin.gpioNumber.toString())}>{pin.gpioNumber}</p>
      {/each}
    </div>
  </div>

  <select
    bind:value={$ultrasonicInputPin}
    class="select select-error select-sm select-bordered"
    id="trigger"
  >
    <option disabled selected>Trigger</option>
    {#each picoGpioPins.filter(p => p.usable && p.isInput) as pin}
      <option
        value="{pin.gpioNumber}"
      >{pin.gpioNumber}</option>
    {/each}
  </select>

  <select
    bind:value={$ultrasonicOutputPin}
    class="select select-info select-sm select-bordered"
    id="output"
  >
    <option disabled selected>Pulse</option>
    {#each picoGpioPins.filter(p => p.usable && !p.isInput) as pin}
      <option value="{pin.gpioNumber}">{pin.gpioNumber}</option>
    {/each}
  </select>
</div>

<div class="flex flex-row flex-nowrap">
  <p class="flex-auto my-4">Distance: {getFormattedDistance(distanceCentimetres)}
  <p class="flex-shrink my-4 text-primary-focus">{getPulseDuration(distanceCentimetres)} pulse
</div>

<input
  on:input={handleSliderInput}
  bind:value={$ultrasonicAngle}
  class="range range-primary range-xs"
  max="90"
  min="-90"
  step="0.1"
  type="range"
>
<div class="flex flex-row flex-nowrap">
  <p style="flex-grow: 4; margin-left: 5px;">| -90°</p>
  <p style="flex-grow: 4; margin-left: 12px;">| 0°</p>
  <p style="flex-direction: row-reverse; margin-right: 5px">90° |</p>
</div>

<div class="divider">
</div>

<Ultrasonic2D></Ultrasonic2D>