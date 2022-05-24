<script>
  import { onMount } from "svelte"

  const horizontalGridLines = 40
  const verticalGridLines = 20
  const darkLineStyle = `rgba(0, 0, 0, 1)`
  const lightLineStyle = `rgba(150, 150, 150, .8)`

  let canvas

  function click(e) {
    console.log(clickLocationToParameter(e))
  }

  function clickLocationToParameter(e) {
    console.log(e)
    return { "x": e.offsetX, "y": e.offsetY }
  }

  function renderGridLines(canvas, ctx) {
    for (let x = 0; x <= canvas.width; x += canvas.width / horizontalGridLines) {
      ctx.beginPath()
      ctx.strokeStyle = x % 50 === 0 ? darkLineStyle : lightLineStyle
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }

    for (let y = 0; y <= canvas.height; y += canvas.height / verticalGridLines) {
      ctx.beginPath()
      ctx.strokeStyle = y % 50 === 0 ? darkLineStyle : lightLineStyle
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
  }

  onMount(() => {
    canvas = document.getElementById("grid")
    let ctx = canvas.getContext("2d")

    renderGridLines(canvas, ctx)
  })
</script>

<canvas on:click={click} id="grid" width="800" height="400" style="background-color: beige">

</canvas>
