const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\n");

const characters = lines.map((line, y) =>
  line.split("").map((char, x) => ({
    char,
    isNumber: /\d/.test(char),
    isSymbol: /[^\d\\.]/.test(char),
    x,
    y,
  }))
);

const partNumbers = characters.flatMap((line) => {
  const numbers = [];
  let state = "symbol";
  line.forEach((char) => {
    switch (state) {
      case "symbol":
        if (char.isNumber) {
          numbers.push({
            xStart: char.x,
            xEnd: char.x,
            y: char.y,
            number: char.char,
          });
          state = "number";
        }
        break;
      case "number":
        if (char.isNumber) {
          const currentNumber = numbers[numbers.length - 1];
          currentNumber.number += char.char;
          currentNumber.xEnd = char.x;
        } else {
          state = "symbol";
        }
        break;
    }
  });
  return numbers;
});

const validPartNumbers = partNumbers.filter((partNumber) => {
  for (let x = partNumber.xStart - 1; x <= partNumber.xEnd + 1; x++) {
    for (let y = partNumber.y - 1; y <= partNumber.y + 1; y++) {
      if (
        characters[y] != null &&
        characters[y][x] != null &&
        characters[y][x].isSymbol
      ) {
        return true;
      }
    }
  }
  return false;
});

const gears = characters
  .flatMap((line) =>
    line
      .filter(({ char }) => char == "*")
      .map((char) => {
        return validPartNumbers.filter((partNumber) => {
          const yDiff = Math.abs(partNumber.y - char.y);
          if (yDiff > 1) {
            return false;
          }
          if (char.x < partNumber.xStart - 1 || partNumber.xEnd + 1 < char.x) {
            return false;
          }
          return true;
        });
      })
  )
  .filter((adjacentParts) => adjacentParts.length == 2)
  .map(([part1, part2]) => +part1.number * +part2.number)
  .reduce((a, b) => a + b, 0);

console.log(gears);
