const fs = require("fs");
const { sum } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();

const [header, ...rest] = input.split("\n\n");
const [_, seedRest] = header.split(": ");
const seedRangeList = seedRest.split(" ").map(Number);
const seedRanges = [];

for (let i = 0; i < seedRangeList.length; i += 2) {
  const start = +seedRangeList[i];
  const length = +seedRangeList[i + 1];
  seedRanges.push({ start, end: start + length });
}

const mappings = rest.map((line) => {
  const [_, rest] = line.split(":");
  const [__, ...rows] = rest.split("\n");
  const ranges = rows.map((row) => {
    const [destStart, srcStart, length] = row.split(" ");
    return {
      offset: +destStart - +srcStart,
      range: {
        start: +srcStart,
        end: +srcStart + +length - 1,
      },
    };
  });
  return ranges;
});

function intersection(range1, range2) {
  const start = Math.max(range1.start, range2.start);
  const end = Math.min(range1.end, range2.end);

  if (end < start) {
    return null;
  }
  return {
    start: start,
    end: end,
  };
}

function mapRange(range, mappings) {
  const intersections = mappings
    .map((m) => {
      const i = intersection(range, m.range);
      if (i == null) {
        return null;
      }
      return { offset: m.offset, range: i };
    })
    .filter(Boolean)
    .sort((a, b) => a.range.start - b.range.start);

  if (intersections.length == 0) {
    return [range];
  }
  let ranges = [];

  let current = range.start;
  intersections.forEach((i) => {
    if (current < i.range.start) {
      ranges.push({
        start: current,
        end: i.range.start - 1,
      });
    }
    ranges.push({
      start: i.offset + i.range.start,
      end: i.offset + i.range.end,
    });
    current = i.range.end + 1;
  });
  if (range.end > intersections[intersections.length - 1].range.end) {
    ranges.push({
      start: intersections[intersections.length - 1].range.end + 1,
      end: range.end,
    });
  }
  return ranges;
}

console.log(
  Math.min(
    ...seedRanges
      .flatMap((range) =>
        mappings.reduce(
          (ranges, mapping) =>
            ranges.flatMap((range) => mapRange(range, mapping)),
          [range]
        )
      )
      .map((r) => r.start)
  )
);
