// --- Day 5: Hydrothermal Venture --- https://adventofcode.com/2021/day/5

const fs = require("fs");
const input = fs.readFileSync("./5.input.txt", "utf-8").split("\n");

function main(all) {
  const lines = [];
  let xMax = 0,
    yMax = 0;
  input.forEach(entry => {
    const [from, to] = entry.split(" -> ");
    const [xFrom, yFrom] = from.split(",").map(Number);
    const [xTo, yTo] = to.split(",").map(Number);

    xMax = Math.max(xMax, xFrom, xTo);
    yMax = Math.max(yMax, yFrom, yTo);

    lines.push({
      from: {
        x: xFrom,
        y: yFrom,
      },
      to: {
        x: xTo,
        y: yTo,
      },
    });
  });

  const pointMap = Array(yMax + 1)
    .fill(null)
    .map(() => Array(xMax + 1).fill(0));

  lines.forEach(line => {
    if (!all && line.from.x !== line.to.x && line.from.y !== line.to.y) {
      return;
    }
    getPointsOnLine(line).forEach(({ x, y }) => {
      pointMap[y][x]++;
    });
  });

  console.log(countOverlaps(pointMap));
}

function countOverlaps(map) {
  let count = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] > 1) count++;
    }
  }
  return count;
}

function getPointsOnLine(line) {
  const result = [];

  const y = getLineEquation(line);  

  if (line.from.x === line.to.x) {
    const [greaterY, lesserY] =
      line.from.y > line.to.y
        ? [line.from.y, line.to.y]
        : [line.to.y, line.from.y];
    for (let index = 0; index <= greaterY - lesserY; index++) {
      result.push({
        x: line.from.x,
        y: lesserY + index,
      });
    }
  } else {
    const [greaterX, lesserX] =
      line.from.x > line.to.x
        ? [line.from.x, line.to.x]
        : [line.to.x, line.from.x];
    for (let index = 0; index <= greaterX - lesserX; index++) {
      const x = lesserX + index;
      result.push({
        y: y(x),
        x
      });
    }
  }

  return result;
}

// return iterator that can be used to easily increment
// equation of a line is y = mx + c
function getLineEquation(line) {
  const slope = (line.from.y - line.to.y) / (line.from.x - line.to.x);
  const c = line.from.y - slope * line.from.x;
  const y = x => slope * x + c;

  return y;
}

main();
main(true);
