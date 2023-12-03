const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\n");

console.log(
  lines
    .map((line) => line.replace(/[^\d]/g, ""))
    .map((line) => line[0] + line[line.length - 1])
    .reduce((a, b) => +a + +b, 0)
);
