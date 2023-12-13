const fs = require("fs");
const { sum, grid } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();

const rows = input.split("\n").map((row) => {
  const [pattern, countStr] = row.split(" ");
  const counts = countStr.split(",").map(Number);

  return {
    pattern: pattern.split("").map((char, index) => ({ char, index })),
    counts,
  };
});

console.log(
  // sum(
  rows.slice(0, 1).map(({ pattern, counts }) => {
    const unkown = pattern.filter(({ char }) => char == "?");

    function isValid(pattern) {
      return (
        pattern
          .map((p) => p.char)
          .join("")
          .split(".")
          .map((l) => l.length)
          .filter(Boolean)
          .join(",") == counts.join(",")
      );
    }

    function countSolutions(index) {
      if (index >= unkown.length) {
        return isValid(pattern) ? 1 : 0;
      }
      let solutions = 0;
      unkown[index].char = "#";
      solutions += countSolutions(index + 1);
      unkown[index].char = ".";
      solutions += countSolutions(index + 1);
      return solutions;
    }
    const answer = countSolutions(0);
    console.log(answer);
    return answer;
  })
  // )
);
