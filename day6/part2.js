const fs = require("fs");
const { sum } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();

const [timesLine, distancesLines] = input.split("\n");

const [_, timesRest] = timesLine.split(":");
const [__, distancesRest] = distancesLines.split(":");
const time = timesRest.replace(/\s/g, "");
const distance = distancesRest.replace(/\s/g, "");

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

console.log(countWinners(time, distance));
