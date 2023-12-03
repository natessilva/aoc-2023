const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\n");

config = {
  red: 12,
  green: 13,
  blue: 14,
};
console.log(
  lines
    .map((line) => {
      const [game, rest] = line.split(": ");
      const [_, gameNumber] = game.split(" ");

      const turns = rest.split("; ");
      const isPossible = turns
        .map((turn) => {
          const moves = turn.split(", ");
          const colors = {};
          moves.forEach((move) => {
            const [count, color] = move.split(" ");
            colors[color] =
              colors[color] == null ? +count : colors[color] + +count;
          });
          for (const color in colors) {
            if (colors[color] > config[color]) {
              return false;
            }
          }
          return true;
        })
        .every((t) => t);
      return isPossible ? +gameNumber : 0;
    })
    .reduce((a, b) => a + b, 0)
);
