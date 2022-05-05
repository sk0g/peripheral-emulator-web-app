<script>
  const centimetresPerMicrosecond = 0.034
  let distance = 100
  let pulseDuration = 1000

  function getFormattedDistance(d) {
    let calcDistance = distance.toFixed(1)

    if (calcDistance >= 100) {
      return `${calcDistance / 100} m`
    }
    return `${calcDistance} cm`
  }

  function getPulseDuration(d) {
    pulseDuration = d / centimetresPerMicrosecond * 2
    return pulseDuration < 1000 ? `${pulseDuration.toFixed()} μs` : `${(pulseDuration / 1000).toPrecision(3)} ms`
  }
</script>

<div class="flex flex-row flex-nowrap">
  <p class="flex-auto my-4">Distance: {getFormattedDistance(distance)}
  <p class="flex-shrink my-4 text-primary-focus">{getPulseDuration(distance)} pulse
</div>

<input
  bind:value={distance}
  class="range range-primary range-xs"
  max="400"
  min="1"
  type="range"
>
<div class="flex flex-row flex-nowrap">
  <p style="flex-grow: 4; margin-left: 5px;">| 8cm</p>
  <p style="flex-grow: 15">| 1m</p>
  <p style="flex-direction: row-reverse; margin-right: 5px">4m |</p>
</div>
