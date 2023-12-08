const fs = require("fs");
const { sum } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();

const [header, all] = input.split("\n\n");

const instructions = header.split("");

const lines = all.split("\n");
const map = new Map(
  lines.map((line) => {
    const [key, values] = line.split(" = ");
    const [left, right] = values.slice(1, values.length - 1).split(", ");
    return [key, { left, right }];
  })
);

let currentValue = "AAA";
let steps = 0;

while (true) {
  const instruction = instructions[steps % instructions.length];
  const current = map.get(currentValue);
  switch (instruction) {
    case "R":
      currentValue = current.right;
      break;
    case "L":
      currentValue = current.left;
      break;
  }
  if (currentValue == "ZZZ") {
    break;
  }
  steps++;
}
console.log(steps + 1);
