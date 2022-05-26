const lineIntersectsCircle = require("./mathUtils")

const defaultPulseOrigin = { x: 400, y: 400 }

const intersectingCases = [
  [{ x: 400, y: 0.0 }, { x: 400, y: 200 }, 10, 200],
  [{ x: 122, y: 122 }, { x: 200, y: 200 }, 10, 283],
  [{ x: 0.0, y: 400 }, { x: 200, y: 395 }, 20, 200],
  [{ x: 100, y: 100 }, { x: 110, y: 105 }, 15, 413]
]

const nonIntersectingCases = [
  [{ x: 288.8, y: 288.8 }, { x: 100, y: 300 }, 10],
  [{ x: 10, y: 10 }, { x: 100, y: 300 }, 10],
  [{ x: 400, y: 0 }, { x: 288, y: 288 }, 10],
  [{ x: 122, y: 122 }, { x: -288, y: -288 }, 10]
]

describe("Intersecting cases", () => {
  test.each(intersectingCases)(
    "given line ending at %p, with circle at %p of radius %p, expect distance to intersection %p",
    (lineEnd, circleOrigin, circleRadius, expectedDistance) => {
      const result = lineIntersectsCircle(defaultPulseOrigin, lineEnd, circleOrigin, circleRadius)
      expect(result).toBeCloseTo(expectedDistance, 0)
    }
  )
})

describe("Non-intersecting cases", () => {
  test.each(nonIntersectingCases)(
    "given line ending at %p, with circle at %p of radius %p",
    (lineEnd, circleOrigin, circleRadius) => {
      const result = lineIntersectsCircle(defaultPulseOrigin, lineEnd, circleOrigin, circleRadius)
      expect(result).toBe(0)
    }
  )
})
