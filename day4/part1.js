const fs = require("fs");
const { sum } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\n");

console.log(
  sum(
    lines.map((line) => {
      const [_, values] = line.split(": ");
      const [winning, have] = values.split(" | ");
      const winningNumbers = winning.split(" ");
      const myNumbers = have.split(" ").filter(Boolean);

      const myWinningNumbers = myNumbers.filter((n) =>
        winningNumbers.includes(n)
      );

      if (myWinningNumbers.length == 0) {
        return 0;
      }
      return Math.pow(2, myWinningNumbers.length - 1);
    })
  )
);
