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
    if (
      polygon[i].y > point.y != polygon[j].y > point.y &&
      point.x < polygon[i].x
    ) {
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
