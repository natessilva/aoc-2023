const fs = require("fs");
const { sum } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\n");

console.log(
  sum(
    lines.map((line) => {
      const [_, rest] = line.split(": ");

      const turns = rest.split("; ");
      const allColors = turns.map((turn) => {
        const moves = turn.split(", ");
        const colors = {};
        moves.forEach((move) => {
          const [count, color] = move.split(" ");
          colors[color] =
            colors[color] == null ? +count : colors[color] + +count;
        });
        return colors;
      });
      const maxBlue = Math.max(
        ...allColors.map((c) => c.blue).filter((i) => i != null)
      );
      const maxRed = Math.max(
        ...allColors.map((c) => c.red).filter((i) => i != null)
      );
      const maxGreen = Math.max(
        ...allColors.map((c) => c.green).filter((i) => i != null)
      );
      return maxBlue * maxRed * maxGreen;
    })
  )
);
