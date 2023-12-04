const fs = require("fs");
const { sum } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\n");

console.log(
  sum(
    lines
      .map((line) => line.replace(/[^\d]/g, ""))
      .map((line) => line[0] + line[line.length - 1])
  )
);
