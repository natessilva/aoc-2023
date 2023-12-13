const fs = require("fs");
const { sum, grid } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();

const rows = input.split("\n").map((row) => {
  const [pattern, countStr] = row.split(" ");
  const counts = new Array(5)
    .fill(null)
    .map(() => countStr)
    .join(",")
    .split(",")
    .map(Number);
  // const counts = countStr.split(",").map(Number);

  const unfoldedPattern = new Array(5)
    .fill(null)
    .map(() => pattern)
    .join("?");

  return {
    // pattern,
    pattern: unfoldedPattern,
    counts,
  };
});

let cache = new Map();

console.log(
  sum(
    rows.map((row) => {
      return countSolutions(row.pattern, row.counts);
    })
  )
);

function countSolutions(pattern, counts) {
  const key = pattern + "::" + counts.join(",");
  const cached = cache.get(key);
  if (cached == null) {
    cache.set(key, _countSolutions(pattern, counts));
  }
  return cache.get(key);
}

function _countSolutions(pattern, counts) {
  if (pattern.length == 0) {
    if (counts.length == 0) {
      return 1;
    }
    return 0;
  }
  if (counts.length == 0) {
    if (pattern.includes("#")) {
      return 0;
    }
    return 1;
  }
  if (pattern.length < counts.length + sum(counts) - 1) {
    return 0;
  }
  switch (pattern[0]) {
    case ".":
      return countSolutions(pattern.slice(1), counts);
    case "#":
      const count = counts[0];
      for (let i = 0; i < count; i++) {
        if (pattern[i] == ".") {
          return 0;
        }
      }
      if (pattern[count] == "#") {
        return 0;
      }
      return countSolutions(pattern.slice(count + 1), counts.slice(1));
    case "?":
      return (
        countSolutions(pattern.slice(1), counts) +
        countSolutions(pattern.replace("?", "#"), counts)
      );
  }
}
