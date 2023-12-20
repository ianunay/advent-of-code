// --- Day 9: Smoke Basin --- https://adventofcode.com/2021/day/9

const fs = require("fs");
const input = fs.readFileSync("./9.input.txt", "utf-8").split("\n");

const heightMap = input.map(row => row.split("").map(Number));

const adjacent = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const lowPointPos = [];

for (let column = 0; column < heightMap.length; column++) {
  for (let row = 0; row < heightMap[column].length; row++) {
    const curr = heightMap[column][row];
    let highCount = 0;
    for (let index = 0; index < adjacent.length; index++) {
      const adjacentColum = column + adjacent[index][0];
      const adjacentRow = row + adjacent[index][1];
      if (
        heightMap[adjacentColum] === undefined ||
        heightMap[adjacentColum][adjacentRow] === undefined ||
        heightMap[adjacentColum][adjacentRow] > curr
      ) {
        highCount++;
      }
    }
    if (highCount === 4) {
      lowPointPos.push({
        column,
        row,
      });
    }
  }
}

const riskSum = lowPointPos.reduce(
  (acc, { column, row }) => acc + heightMap[column][row] + 1,
  0
);
console.log("riskSum:", riskSum);

function findBasin(column, row) {
  const queue = adjacent.map(pos => ({
    column: column + pos[0],
    row: row + pos[1],
  }));
  const basin = [];
  while (queue.length > 0) {
    const {column, row} = queue.shift();
    if (
      heightMap[column] === undefined ||
      heightMap[column][row] === undefined ||
      heightMap[column][row] === 9
    ) {
      continue;
    }
    if (basin.filter(pos => pos.column === column && pos.row === row).length) {
      continue;
    }
    basin.push({row, column});
    const neighbors = adjacent.map(pos => ({
      column: column + pos[0],
      row: row + pos[1],
    }));
    queue.push(...neighbors);
  }
  return basin;
}

const basinSizes = [];
lowPointPos.forEach(({ column, row }) => {
  const basin = findBasin(column, row);
  basinSizes.push(basin.length);
});

const largestBasins = basinSizes.sort((a,b) => b - a).slice(0, 3)
const product = largestBasins.reduce((acc, val) => acc * val, 1);
console.log('three largest basin sizes:', largestBasins, 'their product:', product);
