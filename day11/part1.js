const fs = require("fs");
const { sum, grid } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();

const board = input.split("\n").map((line) => line.split(""));

const mutatedYBoard = board.flatMap((line) =>
  line.every((char) => char == ".") ? [line, line] : [line]
);
const expandedXs = mutatedYBoard[0].map((_, index) =>
  mutatedYBoard.every((line) => line[index] == ".")
);
const galaxies = mutatedYBoard
  .flatMap((line, y) =>
    line
      .flatMap((char, index) => (expandedXs[index] ? [char, char] : [char]))
      .map((char, x) => ({ char, y, x }))
  )
  .filter(({ char }) => char == "#");

const visited = new Set();
console.log(
  sum(
    galaxies.flatMap((g, index) => {
      visited.add(index);
      return galaxies.map((g2, index2) => {
        if (visited.has(index2)) {
          return 0;
        }
        const xDiff = Math.abs(g.x - g2.x);
        const yDiff = Math.abs(g.y - g2.y);
        const diff = xDiff + yDiff;
        return diff;
      });
    })
  )
);
