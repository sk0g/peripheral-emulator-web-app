<script>
  import { onDestroy, onMount } from "svelte"
  import { pinStores } from "../gpioStores.js"
  import { ultrasonicAngle, ultrasonicDetectedDistance } from "../stores.js"
  import { to_number } from "svelte/internal"
  import { lineIntersectsCircle } from "../mathUtils.js"


  export let detectedDistance = 0

  const horizontalGridLines = 40
  const verticalGridLines = 20
  const circleRadius = 15

  const darkLineStyle = `rgba(0, 0, 0, 1)`
  const lightLineStyle = `rgba(150, 150, 150, .8)`
  const sensorLineStyle = `rgb(20, 180, 30)`
  const circleFillStyle = `rgba(255, 111, 97, .75)`

  let canvas, ctx
  let circles = []
  let lineEndX, lineEndY

  function distanceBetweenPoints(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
  }

  function drawCircleAt(x, y) {
    ctx.beginPath()
    ctx.fillStyle = circleFillStyle
    ctx.arc(x, y, circleRadius, 0, 360)
    ctx.stroke()
    ctx.fill()
  }

  function clearGrid() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    renderGridLines()
  }

  function drawPulseWithAngle(angle) {
    // 0 - straight on, 90 full right, -90 full left
    ctx.beginPath()
    ctx.moveTo(400, 400)
    ctx.lineWidth = 4
    ctx.strokeStyle = sensorLineStyle

    // don't ask how, it just works (TM)
    let angle_radians = angle * Math.PI / 180
    lineEndX = 400 + (400 * Math.sin(angle_radians))
    lineEndY = 400 - (400 * Math.cos(angle_radians))

    ctx.lineTo(lineEndX, lineEndY)
    ctx.stroke()
  }

  $: {
    if (ctx && canvas) {
      clearGrid()
      circles.forEach(c => drawCircleAt(c.x, c.y))
      drawPulseWithAngle(to_number($ultrasonicAngle))
    }
  }

  function updateDistanceForNewLineEndings(endX, endY) {
    let distance = 1000

    let circleDistances = circles
      .map(c => lineIntersectsCircle({ x: 400, y: 400 }, { x: endX, y: endY }, c, circleRadius))
      .filter(d => d != 0)
      .sort()

    if (circleDistances.length > 0) distance = circleDistances[circleDistances.length - 1]

    ultrasonicDetectedDistance.update(v => v = distance)
  }

  $: {
    updateDistanceForNewLineEndings(lineEndX, lineEndY)
  }

  function click(e) {
    let clickLoc = clickLocationToParameter(e)
    console.info(clickLoc)

    let tempCircles = circles
      .filter(c => distanceBetweenPoints(c.x, clickLoc.x, c.y, clickLoc.y) > circleRadius)

    if (tempCircles.length < circles.length) { // circle(s) were removed
      circles = tempCircles
    } else { // add new circle to list
      circles = [...circles, ({ x: clickLoc.x, y: clickLoc.y })]
    }
  }

  function clickLocationToParameter(e) {
    return {
      "x": e.offsetX / e.target.getBoundingClientRect().width * 800,
      "y": e.offsetY / e.target.getBoundingClientRect().height * 400
    }
  }

  function renderGridLines(canvas) {
    for (let x = 0; x <= ctx.canvas.width; x += ctx.canvas.width / horizontalGridLines) {
      ctx.beginPath()
      ctx.strokeStyle = x % 50 === 0 ? darkLineStyle : lightLineStyle
      ctx.moveTo(x, 0)
      ctx.lineTo(x, ctx.canvas.height)
      ctx.stroke()
    }

    for (let y = 0; y <= ctx.canvas.height; y += ctx.canvas.height / verticalGridLines) {
      ctx.beginPath()
      ctx.strokeStyle = y % 50 === 0 ? darkLineStyle : lightLineStyle
      ctx.moveTo(0, y)
      ctx.lineTo(ctx.canvas.width, y)
      ctx.stroke()
    }
  }

  onMount(() => {
    canvas = document.getElementById("grid")
    ctx = canvas.getContext("2d")

    renderGridLines(canvas)
  })

  let unsub = pinStores[13].subscribe(newVal => {
    ultrasonicAngle.update(v => v = 180 * (newVal - 1.5))
  })
  onDestroy(unsub)
</script>

<canvas height="400" id="grid" on:click={click} style="background-color: beige" width="800">

</canvas>
