// --- Day 10: Syntax Scoring --- https://adventofcode.com/2021/day/10

const fs = require("fs");
const lines = fs.readFileSync("./10.input.txt", "utf-8").split("\n");

const opens = ['(', '[', '{', '<'];

const closeDict = {
  ')': {b: '(', s: 3},
  ']': {b: '[', s: 57},
  '}': {b: '{', s: 1197},
  '>': {b: '<', s: 25137}
};

let corruptedScore = 0;
let incompleteScores = [];
lines.forEach(l => {
  const brackets = l.split('');
  const stack = [];
  let incomplete = true;

  for (let index = 0; index < brackets.length; index++) {
    const bracket = brackets[index];

    if (opens.includes(bracket)) {
      stack.push(bracket);
      continue;
    }

    const popped = stack.pop();
    if(popped !== closeDict[bracket].b) {
      corruptedScore += closeDict[bracket].s;
      incomplete = false;
      break;
    }
  }

  if (incomplete) {
    const score = stack.reduceRight((acc, bracket) => {
      const s = getScoreOfBracket(bracket);
      return acc * 5 + s;
    }, 0);
    incompleteScores.push(score);
  }
});

function getScoreOfBracket(b) {
  return opens.indexOf(b) + 1;
}

console.log('corruptedScore:', corruptedScore);

const sortedIncompleteScores = incompleteScores.sort((a, b) => a - b);
console.log('incompleteScore:', sortedIncompleteScores[Math.floor(sortedIncompleteScores.length/2)]);
