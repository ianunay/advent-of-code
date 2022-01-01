// --- Day 14: Extended Polymerization --- https://adventofcode.com/2021/day/14

const fs = require("fs");
const [template, rules] = fs
  .readFileSync("./14.input.txt", "utf-8")
  .split("\n\n");

let subStrCounts = {left: {}, right:{}};
const charCounts = {};
const ruleMap = new Map(rules.split("\n").map(line => {
  [key, value] = line.split(" -> ");
  charCounts[key[0]] = 0;
  charCounts[key[1]] = 0;
  subStrCounts.left[key] = 0;
  subStrCounts.right[key] = 0;
  return [key, value];
}));
let lastStr = '';
let left = true;
for (let i = 0; i < template.length - 1; i++) {
  const subStr = template[i] + template[i+1];
  if (left) {
    subStrCounts.left[subStr]++;
  } else {
    subStrCounts.right[subStr]++;
  }
  lastStr = subStr;
  left = !left;
}

const TOTAL_STEPS = 40;

for (let index = 0; index < TOTAL_STEPS; index++) {
  let newSubStrCounts = {left: {...subStrCounts.left}, right: {...subStrCounts.right}};
  
  Object.keys(subStrCounts.left).forEach(key => {
    const count = subStrCounts.left[key];
    if (count === 0) return;

    const insert = ruleMap.get(key);
    const leftPart = key[0] + insert;
    const rightPart = insert + key[1];

    newSubStrCounts.left[key] -= count;
    newSubStrCounts.left[leftPart] += count;
    newSubStrCounts.right[rightPart] += count;
  });

  Object.keys(subStrCounts.right).forEach(key => {
    const count = subStrCounts.right[key];
    if (count === 0) return;

    const insert = ruleMap.get(key);
    const leftPart = key[0] + insert;
    const rightPart = insert + key[1];

    newSubStrCounts.right[key] -= count;
    newSubStrCounts.left[leftPart] += count;
    newSubStrCounts.right[rightPart] += count;
  });

  subStrCounts = {left: {...newSubStrCounts.left}, right: {...newSubStrCounts.right}};

  const insertOfLastStr = ruleMap.get(lastStr);
  lastStr = insertOfLastStr + lastStr[1];
}

Object.keys(subStrCounts.left).forEach(key => {
  const count = subStrCounts.left[key];
  if (count === 0) {
    return;
  }
  const [left, right] = key;
  charCounts[left] += count;
  charCounts[right] += count;
});

// add last character of string
charCounts[lastStr[1]]++;

let maxCount = 0, minCount = Infinity;
Object.keys(charCounts).forEach(char => {
  maxCount = Math.max(maxCount, charCounts[char]);
  minCount = Math.min(minCount, charCounts[char]);
})
console.log('charCounts: ', charCounts);
console.log('max: ', maxCount, 'min:', minCount);
console.log('Answer: ', maxCount - minCount);