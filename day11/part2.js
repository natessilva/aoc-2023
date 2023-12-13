const fs = require("fs");
const { sum, grid } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();

const board = input.split("\n").map((line) => line.split(""));
const multiple = 1000000;

const yValues = board.map((line) =>
  line.every((char) => char == ".") ? multiple : 1
);

const xValues = board[0].map((_, index) =>
  board.every((line) => line[index] == ".") ? multiple : 1
);

galaxies = board
  .flatMap((line, y) => line.map((char, x) => ({ char, y, x })))
  .filter(({ char }) => char == "#");
console.log(galaxies);

const visited = new Set();
console.log(
  sum(
    galaxies.flatMap((g, index) => {
      visited.add(index);
      return galaxies.map((g2, index2) => {
        if (visited.has(index2)) {
          return 0;
        }
        if (g.x > g2.x) {
          const temp = g;
          g = g2;
          g2 = temp;
        }
        let xDiff = 0;
        for (let x = g.x; x <= g2.x; x++) {
          xDiff += xValues[x];
        }
        if (g.y > g2.y) {
          const temp = g;
          g = g2;
          g2 = temp;
        }
        let yDiff = 0;
        for (let y = g.y; y <= g2.y; y++) {
          yDiff += yValues[y];
        }
        return xDiff + yDiff - 2;
      });
    })
  )
);
