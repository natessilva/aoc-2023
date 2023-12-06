const fs = require("fs");
const { sum } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();

const [timesLine, distancesLines] = input.split("\n");

const [_, timesRest] = timesLine.split(":");
const [__, distancesRest] = distancesLines.split(":");
const times = timesRest.split(/\s/g).filter(Boolean).map(Number);
const distances = distancesRest.split(/\s/g).filter(Boolean).map(Number);

function countWinners(time, distance) {
  return (
    time +
    1 -
    (Math.floor((time - Math.sqrt(Math.pow(time, 2) - 4 * distance)) / 2) + 1) *
      2
  );
}

console.log(
  times
    .map((time, index) => countWinners(time, distances[index]))
    .reduce((a, b) => a * b, 1)
);
