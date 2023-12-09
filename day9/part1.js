const fs = require("fs");
const { sum } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();

const lines = input.split("\n");
console.log(
  sum(
    lines.map((line) => {
      const values = line.split(" ").map(Number);
      // console.log("values", values);
      let currentValues = values;

      const sequences = [values];
      while (true) {
        const newSequence = currentValues
          .slice(1)
          .map((v, i) => v - currentValues[i]);
        currentValues = newSequence;
        if (newSequence.every((s) => s == 0)) {
          break;
        }
        sequences.push(newSequence);
      }
      return sum(sequences.map((s) => s[s.length - 1]));
    })
  )
);
