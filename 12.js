// --- Day 12: Passage Pathing --- https://adventofcode.com/2021/day/12

const fs = require("fs");
const inputLines = fs.readFileSync("./12.input.txt", "utf-8").split("\n");

const graph = new Map();

inputLines.forEach(l => {
  let [from, to] = l.split("-");
  if (to === "start" || from === "end") {
    [from, to] = [to, from];
  }
  if (graph.has(from)) {
    graph.get(from).push(to);
  } else {
    graph.set(from, [to]);
  }

  if (["start", "end"].includes(to) || ["start", "end"].includes(from)) {
    return;
  }

  if (graph.has(to)) {
    graph.get(to).push(from);
  } else {
    graph.set(to, [from]);
  }
});

console.log("graph:", graph);

let totalPaths = 0;
let totalPaths2 = 0;

console.log("\n", "all paths:");
findEnd("start", ['start']);
console.log();
findEnd2("start", ['start']);
console.log("\n", "totalPaths:", totalPaths);
console.log("\n", "totalPaths2:", totalPaths2);

function findEnd(cave, visited) {
  if (cave === "end") {
    totalPaths++;
    console.log(visited.join(','));
    return;
  }

  graph.get(cave).forEach(c => {
    if (isLowerCase(c) && visited.includes(c)) {
      return;
    }
    const v = [...visited];
    v.push(c);
    findEnd(c, v);
  });
}

function findEnd2(cave, visited) {
  if (cave === "end") {
    totalPaths2++;
    console.log(visited.join(','));
    return;
  }

  graph.get(cave).forEach(c => {
    const v = [...visited];
    v.push(c);
    if (!hasOnlyOneSmallCaveRepeating(v)) {
      return;
    }
    findEnd2(c, v);
  });
}

function isLowerCase(str) {
  return str === str.toLowerCase();
}

function hasOnlyOneSmallCaveRepeating(visited) {
  let result = true;
  let repeated = null;
  const visitedSet = new Set();
  for (let index = 0; index < visited.length; index++) {
    const cave = visited[index];

    if (!isLowerCase(cave)) {
      continue;
    }
    
    if (visitedSet.has(cave)) {
      if (repeated !== null) {
        result = false;
        break;
      } else {
        repeated = cave;
      }
    } else {
      visitedSet.add(cave);
    }
  }
  return result;
}
