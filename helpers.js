function sum(nums) {
  return nums.reduce((a, b) => +a + +b, 0);
}

// pointInPolygon returns whether the point is enclosed
// by the polygon described by an ordered list of vertices
// using raycasting. Count the number of lines we'd intersect
// if a line was drawn from point. If that number is odd,
// the point is enclosed.
function pointInPolygon(point, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const vertexI = polygon[i];
    const vertexJ = polygon[j];

    // the line intersects if y is between the ys of the
    // vertices

    const isBetweenYs = vertexI.y > point.y != vertexJ.y > point.y;
    if (!isBetweenYs) {
      continue;
    }

    // We are only interested in line intersections on one
    // side. Doesn't matter which so we will chose the right.

    // find the line between each vertex

    // slope = (vertexI.y - vertexJ.y) / (vertexI.x - vertexJ.x)
    // in point-slope form the line is:
    // y-vertexI.y = slope(x-vertextI.x)

    // solving for x we get
    // x = (y-vertexI.y)/slope+vertexI.x

    // if we plug the y for our point into the line equation
    // we get the x on the line.
    const lineX =
      ((point.y - vertexI.y) * (vertexI.x - vertexJ.x)) /
        (vertexI.y - vertexJ.y) +
      vertexI.x;

    // if point.x < lineX, the line is on the right side of
    // the point
    if (point.x < lineX) {
      // there must be an odd number of intersecting lines on the right
      inside = !inside;
    }
  }
  return inside;
}

const grid = {
  get(grid, x, y) {
    return grid[y]?.[x];
  },
  flipHorizontal(grid) {
    return grid.map((row) => row.toReversed());
  },
  flipVertical(grid) {
    return grid.map((row) => [...row]).toReversed();
  },
  rotateClockwise(grid) {
    return grid[0].map((_, index) => grid.map((row) => row[index]).reverse());
  },
  rotateCounterClockwise(grid) {
    return grid[0].map((_, index) =>
      grid.map((row) => row[row.length - 1 - index])
    );
  },
};

module.exports = { sum, grid, pointInPolygon };
