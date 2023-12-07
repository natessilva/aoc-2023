const fs = require("fs");
const { sum } = require("../helpers");
const input = fs.readFileSync("./input.txt").toString();

const lines = input.split("\n");

const hands = lines.map((line) => {
  const [hand, bid] = line.split(" ");
  return { hand, bid };
});

const types = [
  "high card",
  "one pair",
  "two pair",
  "three of kind",
  "full house",
  "four of kind",
  "five of kind",
];

function classifyHand(hand) {
  const cards = hand.split("");

  const ranks = new Map();
  cards.forEach((card) => ranks.set(card, (ranks.get(card) ?? 0) + 1));
  if (ranks.size == 5) {
    return "high card";
  }
  if (ranks.size == 4) {
    return "one pair";
  }
  if (ranks.size == 3) {
    if (Array.from(ranks.values()).find((value) => value > 2) != null) {
      return "three of kind";
    }
    return "two pair";
  }
  if (ranks.size == 2) {
    if (Array.from(ranks.values()).find((value) => value == 3) != null) {
      return "full house";
    }
    return "four of kind";
  }
  return "five of kind";
}

const strength = "AKQJT98765432".split("").reverse();

function compareRank(a, b) {
  return strength.indexOf(a) - strength.indexOf(b);
}

console.log(
  sum(
    hands
      .map((hand) => ({ ...hand, type: classifyHand(hand.hand) }))
      .sort((handA, handB) => {
        let diff = types.indexOf(handA.type) - types.indexOf(handB.type);
        let index = 0;
        while (diff == 0) {
          diff = compareRank(handA.hand[index], handB.hand[index]);
          index++;
        }
        return diff;
      })
      .map(({ bid }, index) => bid * (index + 1))
  )
);
