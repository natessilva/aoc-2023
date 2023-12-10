const fs = require("fs");
const { sum, grid } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();
let start = { char: "", x: 0, y: 0 };
const board = input.split("\n").map((line, y) =>
  line.split("").map((char, x) => {
    const p = { char, x, y };
    if (char == "S") {
      start = p;
    }
    return p;
  })
);

function neighbors(point) {
  const { char, x, y } = point;
  switch (char) {
    case "|":
      return [grid.get(board, x, y + 1), grid.get(board, x, y - 1)].filter(
        Boolean
      );
    case "-":
      return [grid.get(board, x + 1, y), grid.get(board, x - 1, y)].filter(
        Boolean
      );
    case "L":
      return [grid.get(board, x, y - 1), grid.get(board, x + 1, y)].filter(
        Boolean
      );
    case "J":
      return [grid.get(board, x, y - 1), grid.get(board, x - 1, y)].filter(
        Boolean
      );
    case "7":
      return [grid.get(board, x, y + 1), grid.get(board, x - 1, y)].filter(
        Boolean
      );
    case "F":
      return [grid.get(board, x, y + 1), grid.get(board, x + 1, y)].filter(
        Boolean
      );
    case ".":
      return [];
    case "S":
      let results = [];
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i == 0 && j == 0) {
            continue;
          }
          const p = grid.get(board, x + i, y + j);
          if (p == null) {
            continue;
          }
          const found = neighbors(p).find((p) => p === point);
          if (found != null) {
            results.push(p);
          }
        }
      }
      return results;
  }
  return [];
}

function findMax() {
  const set = new Set();
  const queue = [{ p: start, dist: 0 }];
  let max = 0;
  while (queue.length) {
    const value = queue.shift();
    if (!value) {
      break;
    }
    const { p, dist } = value;
    if (dist > max) {
      max = dist;
    }
    set.add(p);
    const ns = neighbors(p)
      .filter((p) => !set.has(p))
      .map((p) => ({ p, dist: dist + 1 }));
    queue.push(...ns);
  }
  return max;
}

console.log(findMax());
