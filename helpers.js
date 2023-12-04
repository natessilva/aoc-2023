function sum(nums) {
  return nums.reduce((a, b) => +a + +b, 0);
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

module.exports = { sum, grid };
