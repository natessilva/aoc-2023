const fs = require("fs");
const { sum } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\n");

const digitStrings = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const digitNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
console.log(
  sum(
    lines.map((line) => {
      const stringIndex = Math.min(
        ...digitStrings
          .map((digit) => line.indexOf(digit))
          .filter((i) => i != -1)
      );
      const digitIndex = Math.min(
        ...digitNumbers
          .map((digit) => line.indexOf(digit))
          .filter((i) => i != -1)
      );
      let firstDigit = "";
      if (stringIndex < digitIndex) {
        firstDigit = (
          digitStrings.findIndex((digit) =>
            line.substring(stringIndex).startsWith(digit)
          ) + 1
        ).toString();
      } else {
        firstDigit = (
          digitNumbers.findIndex((digit) =>
            line.substring(digitIndex).startsWith(digit)
          ) + 1
        ).toString();
      }
      const secondStringIndex = Math.max(
        ...digitStrings
          .map((digit) => line.lastIndexOf(digit))
          .filter((i) => i != -1)
      );
      const secondDigitIndex = Math.max(
        ...digitNumbers
          .map((digit) => line.lastIndexOf(digit))
          .filter((i) => i != -1)
      );
      let secondDigit = "";
      if (secondStringIndex > secondDigitIndex) {
        secondDigit = (
          digitStrings.findIndex((digit) =>
            line.substring(secondStringIndex).startsWith(digit)
          ) + 1
        ).toString();
      } else {
        secondDigit = (
          digitNumbers.findIndex((digit) =>
            line.substring(secondDigitIndex).startsWith(digit)
          ) + 1
        ).toString();
      }
      return firstDigit + secondDigit;
    })
  )
);
