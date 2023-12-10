const fs = require("fs");
const { sum, grid, pointInPolygon } = require("../helpers");
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

function findLoop() {
  const set = new Set();
  let loop = [];
  let p = start;
  while (p) {
    set.add(p);
    loop.push(p);
    p = neighbors(p).filter((p) => !set.has(p))[0];
  }
  return { set, loop };
}

const { set, loop } = findLoop();

console.log(
  board
    .flatMap((row) =>
      row.filter((p) => !set.has(p)).map((p) => pointInPolygon(p, loop))
    )
    .filter(Boolean).length
);
