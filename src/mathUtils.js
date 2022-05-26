// weird gradient descent/ binary search for the smallest distance
// along the segment l1 => l2 to the point c
function lineIntersectsCircle(l1, l2, c, cr) {
  function getWeightedPoints(biasTowardsL1) {
    return {
      x: l2.x * biasTowardsL1 + l1.x * (1 - biasTowardsL1),
      y: l2.y * biasTowardsL1 + l1.y * (1 - biasTowardsL1)
    }
  }

  function distance(point, target = c) {
    return Math.sqrt(Math.pow(point.x - target.x, 2) + Math.pow(point.y - target.y, 2))
  }

  let currentStepSize = .5
  let bestGuess = .5
  let closestDistance

  for (let i = 0; i < 8; i++) {
    currentStepSize /= 2

    let currentDistance = distance(getWeightedPoints(bestGuess))
    let upDistance = distance(getWeightedPoints(bestGuess + currentStepSize))
    let downDistance = distance(getWeightedPoints(bestGuess - currentStepSize))

    closestDistance = Math.min(currentDistance, upDistance, downDistance)

    if (closestDistance === upDistance) bestGuess += currentStepSize
    else if (closestDistance === downDistance) bestGuess -= currentStepSize
  }

  let closestPoints = getWeightedPoints(bestGuess)
  let distanceOnSegment = distance(l1, closestPoints)
  let distanceToCenter = distance(closestPoints)

  return distanceToCenter <= cr ? distanceOnSegment : 0
}


module.exports = lineIntersectsCircle
