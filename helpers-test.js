const assert = require("assert");
const { sum, grid } = require("./helpers");

assert.equal(sum([1, 2, 3]), 6);

assert.equal(grid.get([[1, 2, 3]], 0, 0), 1);
assert.equal(grid.get([[1, 2, 3]], 0, 1), null);
assert.equal(grid.get([[1, 2, 3]], -1, -1), null);
assert.equal(grid.get([[1, 2, 3]], 1, 0), 2);

assert.deepEqual(
  grid.flipHorizontal([
    [1, 2, 3],
    [3, 1, 2],
    [2, 3, 1],
  ]),
  [
    [3, 2, 1],
    [2, 1, 3],
    [1, 3, 2],
  ]
);

assert.deepEqual(
  grid.flipVertical([
    [1, 2, 3],
    [3, 1, 2],
    [2, 3, 1],
  ]),
  [
    [2, 3, 1],
    [3, 1, 2],
    [1, 2, 3],
  ]
);

assert.deepEqual(
  grid.rotateClockwise([
    [1, 2, 3],
    [2, 4, 5],
    [3, 5, 6],
  ]),
  [
    [3, 2, 1],
    [5, 4, 2],
    [6, 5, 3],
  ]
);

assert.deepEqual(
  grid.rotateClockwise([
    [1, 2],
    [2, 4],
    [3, 5],
  ]),
  [
    [3, 2, 1],
    [5, 4, 2],
  ]
);

assert.deepEqual(
  [
    [1, 2],
    [2, 4],
    [3, 5],
  ],
  grid.rotateCounterClockwise(
    grid.rotateClockwise([
      [1, 2],
      [2, 4],
      [3, 5],
    ])
  )
);

assert.deepEqual(
  [
    [1, 2, 3],
    [2, 4, 5],
    [3, 5, 6],
  ],
  grid.rotateCounterClockwise(
    grid.rotateClockwise([
      [1, 2, 3],
      [2, 4, 5],
      [3, 5, 6],
    ])
  )
);
