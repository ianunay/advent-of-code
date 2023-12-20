// --- Day 17: Trick Shot --- https://adventofcode.com/2021/day/17

const fs = require("fs");
const [xArea, yArea] = fs
  .readFileSync("./17.input.txt", "utf-8")
  .split("target area: ")[1]
  .split(", ")
  .map(c => c.split("=")[1].split("..").map(Number));

function getMaximumYPosition() {
  const lowestPoint = { x: Math.max(...xArea), y: Math.min(...yArea) };
  let vyMax = Math.abs(lowestPoint.y) - 1;
  let y = 0;
  let yMax = -Infinity;
  while (y > lowestPoint.y) {
    y += vyMax;
    vyMax--;
    yMax = Math.max(yMax, y);
  }
  return yMax;
}

console.log(getMaximumYPosition());

// Assuming target is in the range of y<0 and x>0
function findAllVelocities() {
  const velocities = [];
  const yMax = Math.abs(yArea[0]);
  const xMax = xArea[1];
  for (let y = -yMax; y <= yMax; y++) {
    for (let x = 0; x <= xMax; x++) {
      if (isSuccessfulLaunch(x, y)) velocities.push(x + "," + y);
    }
  }
  return velocities;
}

function isSuccessfulLaunch(vx, vy) {
  let hit = false;

  let x = 0,
    y = 0;

  while (y > yArea[0]) {
    x += vx;
    y += vy;

    if (hasReachedTarget(x, y)) {
      hit = true;
      break;
    }

    if (vx !== 0) {
      const delta = vx > 0 ? -1 : 1;
      vx += delta;
    }

    vy--;
  }

  return hit;
}

function hasReachedTarget(x, y) {
  return x >= xArea[0] && x <= xArea[1] && y >= yArea[0] && y <= yArea[1];
}

const allVelocities = findAllVelocities();

console.log(allVelocities.length);

/**
 * Not Related to the solution
 *
 * functions to plot paths in console
 *
 * e.x. printProjectilePath(9, 2)
 */

const size = 100;
function printProjectilePath(vx, vy) {
  const max_steps = 22;

  const grid = Array(size + 1)
    .fill(null)
    .map(() => Array(size).fill("."));
  const position = { x: 0, y: size / 2 };
  fillTargetArea(grid);
  grid[position.y][position.x] = "S";
  for (let step = 1; step < max_steps; step++) {
    position.x += vx;
    position.y += vy;

    if (!(grid[position.y] && grid[position.y][position.x])) {
      break;
    }

    grid[position.y][position.x] = "#";

    if (vx !== 0) {
      const delta = vx > 0 ? -1 : 1;
      vx += delta;
    }

    vy--;
  }
  printGrid(grid);
}

function fillTargetArea(grid) {
  for (let column = yArea[0]; column < yArea[1]; column++) {
    for (let row = xArea[0]; row < xArea[1]; row++) {
      grid[column + size / 2][row] = "T";
    }
  }
}

function printGrid(grid) {
  for (let column = grid.length - 1; column >= 0; column--) {
    let line = "";
    for (let row = 0; row < grid[column].length; row++) {
      line += grid[column][row];
    }
    console.log(line);
  }
}

