// --- Day 15: Chiton --- https://adventofcode.com/2021/day/15

const fs = require("fs");
const inputLines = fs.readFileSync("./15.input.txt", "utf-8").split("\n");

// const grid = inputLines.map(line => line.split("").map(Number));
let totalSum = 0;
const grid = inputLines.map(line => line.split("").map(n => {
  const number = Number(n);
  totalSum += number;
  return number;
}));

console.log(totalSum);

const neighbors = [
  [0, -1],
  [-1, 0],
  [0, 1],
  [1, 0],
];

function neighboringNodes(node) {
  const result = [];
  neighbors.forEach(([column, row]) => {
    const [neighborColum, neighborRow] = [node.column + column, node.row + row];
    if (grid[neighborColum] && grid[neighborColum][neighborRow] !== undefined) {
      result.push({ column: neighborColum, row: neighborRow });
    }
  });
  return result;
}

let currMin = Infinity;

function findMinimumRiskPath(node, risk, visited) {

  
  if (risk >= 980) {
    return Infinity;
  }
  
  const { column, row } = node;
  if (column === 0 && row === 0) {
    currMin = Math.min(risk, currMin);
    console.log("reached", risk, currMin);
    return risk;
  }

  const nodeKey = column + "-" + row;
  if (visited.has(nodeKey)) {
    return Infinity;
  }

  const nodes = neighboringNodes(node);
  const newSet = new Set(visited);
  newSet.add(nodeKey);
  const newRisk = risk + grid[column][row];

  return Math.min(
    ...nodes.map(p => {
      return findMinimumRiskPath(p, newRisk, newSet);
    })
  );
}

const rightCornerNode = { column: grid.length - 1, row: grid[0].length - 1 };
const totalRisk = findMinimumRiskPath(rightCornerNode, 0, new Set());

console.log(totalRisk);
