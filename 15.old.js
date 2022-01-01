// --- Day 15: Chiton --- https://adventofcode.com/2021/day/15

const fs = require("fs");
const inputLines = fs.readFileSync("./15.input.txt", "utf-8").split("\n");

const grid = inputLines.map(line => line.split("").map(Number));

/**

1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581


116375174 2
138137367 2
213651132 8
369493156 9
746341711 1
131912813 7
135991242 1
312542163 9
129313852 1

231194458 1



11637517 4  2
13813736 7  2
21365113 2  8
36949315 6  9
74634171 1  1
13191281 3  7
13599124 2  1
31254216 3  9

12931385 2  1
    
23119445 8  1

1. find all min scores
2. Min [ all functions that return  ]

 */

function findMinRiskNodes(node) {
  const { column, row } = node;
  let minRiskNodes = [];
  const differential = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
  ];
  let currNeighbors = differential.map(_ => [column, row]);
  let currNeighborValues;
  let currMinimum = Infinity;

  do {
    currNeighbors = differential.map((n, i) => [currNeighbors[i][0] + n[0], currNeighbors[i][1] + n[1]]);
    currNeighborValues = currNeighbors.map(neighbor => {
      const [column, row] = neighbor;
      const value = (grid[column] && grid[column][row]) || null;

      if (value === null) {
        return null;
      } else if (value < currMinimum) {
        currMinimum = value;
        minRiskNodes = [{column, row}];
      } else if(value === currMinimum) {
        minRiskNodes.push({column, row})
      }

      return value;
    });
    // console.log(currNeighborValues.filter(v => v !== null).length > 0);
  } while (currNeighborValues.filter(v => v !== null).length > 0);

  return {minRiskNodes, minRisk: currMinimum};
}

const visited = new Set();

function findMinimumRiskPath(node, risk) {
  if (node.column === 0 && node.row === 0) {
    console.log('reached', risk);
    return risk;
  }

  const {minRiskNodes, minRisk} = findMinRiskNodes(node);
  const nodeKey = node.column + '-' + node.row;

  if (visited.has(nodeKey)) {
    return Infinity;
  }

  console.log(nodeKey, minRiskNodes, minRisk);
  visited.add(nodeKey);

  return (
    risk +
    Math.min(
      ...minRiskNodes.map(p => {
        return findMinimumRiskPath(p, minRisk);
      })
    )
  );
}

const rightCornerNode = { column: grid.length - 1, row: grid[0].length - 1 };
const totalRisk = findMinimumRiskPath(rightCornerNode, 0);

console.log(totalRisk);