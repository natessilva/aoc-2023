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
  let newNumber = {
    xStart: 0,
    xEnd: 0,
    y: 0,
    number: "",
  };
  line.forEach((char) => {
    switch (state) {
      case "symbol":
        if (char.isNumber) {
          newNumber.number = char.char;
          newNumber.xStart = char.x;
          newNumber.xEnd = char.x;
          newNumber.y = char.y;
          state = "number";
        }
        break;
      case "number":
        if (char.isNumber) {
          newNumber.number += char.char;
          newNumber.xEnd = char.x;
        } else {
          numbers.push(newNumber);
          newNumber = {
            xStart: 0,
            xEnd: 0,
            y: 0,
            number: "",
          };
          state = "symbol";
        }
        break;
    }
  });
  if (state == "number") {
    newNumber.xEnd == line.length - 1;
    numbers.push(newNumber);
  }
  return numbers;
});

const validPartNumbers = partNumbers.filter((partNumber) => {
  let isValid = false;
  for (let x = partNumber.xStart; x <= partNumber.xEnd; x++) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i == 0 && j == 0) {
          continue;
        }
        if (
          characters[partNumber.y + j] != null &&
          characters[partNumber.y + j][x + i] != null &&
          characters[partNumber.y + j][x + i].isSymbol
        ) {
          isValid = true;
        }
      }
    }
  }

  return isValid;
});

const gears = characters
  .flatMap((line) =>
    line.map((char) => {
      if (char.char != "*") {
        return [];
      }
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
