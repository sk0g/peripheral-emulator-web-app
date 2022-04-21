<script>
  import Slider from "svelte-slider";

  let distance = 109;
  let displayString = "1.09 m"

  function getFormattedDistance() {
    let calcDistance = 8 + (distance * 392)
    calcDistance = calcDistance.toFixed(1)

    if (calcDistance > 100) {
      displayString = `${calcDistance / 100} m`;
    }
    displayString = `${calcDistance} cm`;
  }
</script>

Distance: {displayString}
<div class="slider">
  <Slider on:change={(event) => {distance = event.detail[1]; getFormattedDistance()}} value={[0, 1]} single />
</div>

<style>
  .slider {
    --sliderPrimary: #FF9800;
    --sliderSecondary: rgba(0, 0, 0, 0.05);
    margin: 16px;
  }
</style>