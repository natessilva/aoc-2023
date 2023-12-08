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

let currentValues = Array.from(map.keys()).filter((key) => key.endsWith("A"));
let stepsToCompleteEachKey = currentValues.map((currentValue) => {
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
    if (currentValue.endsWith("Z")) {
      break;
    }
    steps++;
  }
  return steps + 1;
});

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(arr) {
  return arr.reduce((prev, a) => (prev * a) / gcd(prev, a), 1);
}

console.log(lcm(stepsToCompleteEachKey));
