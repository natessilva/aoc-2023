const fs = require("fs");
const { sum } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();

const [header, ...rest] = input.split("\n\n");
const [_, seedRest] = header.split(": ");
const seeds = seedRest.split(" ").map(Number);
const mappings = rest.map((line) => {
  const [_, rest] = line.split(":");
  const [__, ...rows] = rest.split("\n");
  const ranges = rows.map((row) => {
    const [destStart, srcStart, length] = row.split(" ");
    return {
      destStart: +destStart,
      srcStart: +srcStart,
      length: +length,
    };
  });
  return ranges;
});

function mapValue(value, ranges) {
  const range = ranges.find(
    (range) => value >= range.srcStart && value - range.srcStart <= range.length
  );
  if (range == null) {
    return value;
  }
  return value - range.srcStart + range.destStart;
}

console.log(
  Math.min(
    ...mappings.reduce(
      (values, mapping) => values.map((value) => mapValue(value, mapping)),
      seeds
    )
  )
);
