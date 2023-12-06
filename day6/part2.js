const fs = require("fs");
const { sum } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();

const [timesLine, distancesLines] = input.split("\n");

const [_, timesRest] = timesLine.split(":");
const [__, distancesRest] = distancesLines.split(":");
const time = +timesRest.replace(/\s/g, "");
const distance = +distancesRest.replace(/\s/g, "");

function countWinners(time, distance) {
  return (
    time +
    1 -
    (Math.floor((time - Math.sqrt(Math.pow(time, 2) - 4 * distance)) / 2) + 1) *
      2
  );
}

console.log(countWinners(time, distance));
