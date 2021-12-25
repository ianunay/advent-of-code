// --- Day 11: Dumbo Octopus --- https://adventofcode.com/2021/day/11

const fs = require("fs");
const inputLines = fs.readFileSync("./11.input.txt", "utf-8").split("\n");

const grid = inputLines.map(l => l.split("").map(Number));
const TOTAL_STEPS = 100;
let totalFlashes = 0;
let synchronizedStep = Infinity;
let index = 0
for (; index < TOTAL_STEPS; index++) {
  step(index);
}

function step(index) {
  incrementAll();
  
  let yetToFlash = findYetToFlash();
  while (yetToFlash.length > 0) {
    yetToFlash.forEach(({column, row}) => {
      grid[column][row] = 0;
      totalFlashes++;
      flash(column, row);
    });
    if(isSynchronized()) {
      synchronizedStep = index;
    }

    yetToFlash = [];

    const nextYetToFlash = findYetToFlash();
    yetToFlash.push(...nextYetToFlash);
  }
}

console.log('grid:', grid);
console.log('totalFlashes:', totalFlashes);

while (synchronizedStep === Infinity) {
  index++;
  step(index);
}

console.log('synchronizedStep:', synchronizedStep);

function incrementAll() {
  for (let column = 0; column < grid.length; column++) {
    for (let row = 0; row < grid[column].length; row++) {
      grid[column][row]++;
    }
  }
}

function flash(column, row) {
  const adjacent = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1]
  ];

  adjacent.forEach(([dColumn, dRow]) => {
    const currColumn = column + dColumn,
      currRow = row + dRow;
    if (grid[currColumn] === undefined || grid[currColumn][currRow] === undefined) {
      return;
    }

    if (grid[currColumn][currRow] !== 0) {
      grid[currColumn][currRow]++;
    }
  });
}

function findYetToFlash() {
  const result = [];
  for (let column = 0; column < grid.length; column++) {
    for (let row = 0; row < grid[column].length; row++) {
      if (grid[column][row] > 9) {
        result.push({column, row});
      }
    }
  }
  return result;
}

function isSynchronized() {
  let allZeros = true;
  for (let column = 0; column < grid.length && allZeros; column++) {
    for (let row = 0; row < grid[column].length; row++) {
      if (grid[column][row] !== 0) {
        allZeros = false;
        break;
      }
    }
  }
  return allZeros;
}