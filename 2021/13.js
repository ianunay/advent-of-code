// --- Day 13: Transparent Origami --- https://adventofcode.com/2021/day/13

const fs = require("fs");
const [inputPoints, folds] = fs
  .readFileSync("./13.input.txt", "utf-8")
  .split("\n\n");
let [xMax, yMax] = [0, 0];

const foldInstructions = folds.split("\n").map(l => {
  let [str, val] = l.split("=");
  const coordinate = str[str.length - 1];
  return {
    [coordinate]: Number(val),
  };
});

const coordinates = inputPoints.split("\n").map(p => {
  const [x, y] = p.split(",");
  xMax = Math.max(xMax, x);
  yMax = Math.max(yMax, y);
  return { x, y };
});

const grid = Array(yMax + 1)
  .fill(null)
  .map(() => Array(xMax + 1).fill("."));
coordinates.forEach(point => {
  grid[point.y][point.x] = "#";
});

let result = grid;
foldInstructions.forEach((instruction, index) => {
  if (instruction.y) {
    result = foldY(result, instruction.y);
  } else {
    result = foldX(result, instruction.x);
  }
  console.log();
  printGrid(result);
  console.log();
  const count = countHashes(result);
  console.log("count after", index + 1, "folds:", count);
});

function countHashes(grid) {
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "#") {
        count++;
      }
    }
  }
  return count;
}

function printGrid(grid) {
  for (let y = 0; y < grid.length; y++) {
    let line = "";
    for (let x = 0; x < grid[y].length; x++) {
      line += grid[y][x] + " ";
    }
    console.log(line);
  }
}

function foldX(grid, val) {
  const leftGrid = [],
    rightGrid = [],
    resultGrid = [];
  for (let y = 0; y < grid.length; y++) {
    const leftRow = [];
    const rightRow = [];
    for (let x = 0; x < grid[y].length; x++) {
      const elem = grid[y][x];
      if (x < val) {
        leftRow.push(elem);
      } else if (x > val) {
        rightRow.push(elem);
      }
    }
    leftGrid.push(leftRow);
    rightGrid.push(rightRow);
  }

  for (let y = 0; y < leftGrid.length; y++) {
    const row = [];
    for (
      let xLeft = 0, xRight = rightGrid[0].length - 1;
      xLeft < leftGrid[y].length || xRight >= 0;
      xLeft++, xRight--
    ) {
      if (leftGrid[y][xLeft] === "#" || rightGrid[y][xRight] === "#") {
        row.push("#");
      } else {
        row.push(".");
      }
    }
    resultGrid.push(row);
  }

  return resultGrid;
}

function foldY(grid, val) {
  const topGrid = grid.slice(0, val);
  const bottomGrid = grid.slice(val + 1);

  const resultGrid = [];

  for (
    let yTop = topGrid.length - 1, yBottom = 0;
    yTop >= 0 || yBottom < bottomGrid.length;
    yTop--, yBottom++
  ) {
    const row = [];
    for (let x = 0; x < topGrid[0].length; x++) {
      if (
        (topGrid[yTop] && topGrid[yTop][x] === "#") ||
        (bottomGrid[yBottom] && bottomGrid[yBottom][x] === "#")
      ) {
        row.push("#");
      } else {
        row.push(".");
      }
    }
    resultGrid.unshift(row);
  }

  return resultGrid;
}
