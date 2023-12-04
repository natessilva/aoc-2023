const fs = require("fs");
const { sum } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\n");

const winningNumbers = lines
  .map((line) => {
    const [_, values] = line.split(": ");
    const [winning, have] = values.split(" | ");
    const winningNumbers = winning.split(" ");
    const myNumbers = have.split(" ").filter(Boolean);

    const myWinningNumbers = myNumbers.filter((n) =>
      winningNumbers.includes(n)
    );
    return myWinningNumbers.length;
  })
  .map((num) => ({
    copies: 1,
    num,
  }));

winningNumbers.forEach(({ num, copies }, index) => {
  for (let i = 0; i < num; i++) {
    if (winningNumbers[index + 1 + i] != null) {
      winningNumbers[index + 1 + i].copies += copies;
    }
  }
});

console.log(sum(winningNumbers.map((n) => n.copies)));
