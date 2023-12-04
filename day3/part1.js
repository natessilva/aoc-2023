const fs = require("fs");
const { sum } = require("../helpers");
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

console.log(
  sum(
    partNumbers
      .filter((partNumber) => {
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
      })
      .map((partNumber) => +partNumber.number)
  )
);
