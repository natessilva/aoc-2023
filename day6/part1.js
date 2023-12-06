const fs = require("fs");
const { sum } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();

const [timesLine, distancesLines] = input.split("\n");

const [_, timesRest] = timesLine.split(":");
const [__, distancesRest] = distancesLines.split(":");
const times = timesRest.split(/\s/g).filter(Boolean);
const distances = distancesRest.split(/\s/g).filter(Boolean);

function countWinners(time, distance) {
  let winners = 0;
  for (let speed = 0; speed <= time; speed++) {
    const myDistance = (time - speed) * speed;
    if (myDistance > distance) {
      winners++;
    }
  }
  return winners;
}

console.log(
  times
    .map((time, index) => countWinners(time, distances[index]))
    .reduce((a, b) => a * b, 1)
);
