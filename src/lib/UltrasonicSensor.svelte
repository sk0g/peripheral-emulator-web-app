<script>

  let distance = 100;

  function getFormattedDistance(d) {
    let calcDistance = distance.toFixed(1);

    if (calcDistance >= 100) {
      return `${calcDistance / 100} m`;
    }
    return `${calcDistance} cm`;
  }
</script>

<p class="my-4">Distance: {getFormattedDistance(distance)}</p>

<input
  bind:value={distance}
  class="range range-primary range-xs"
  max="400"
  min="1"
  type="range"
>
<div class="grid grid-flow-col auto-cols-fr">
  <p class="col-span-3" style="grid-column-start: 1;">&nbsp;| 8cm</p>
  <p style="grid-column-start: 4;">| 1m</p>
  <p style="grid-column-end: 13;">4m |</p>
</div>
