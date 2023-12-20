// --- Day 15: Chiton --- https://adventofcode.com/2021/day/15

const fs = require("fs");
const inputLines = fs.readFileSync("./15.input.txt", "utf-8").split("\n");

const grid = inputLines.map((line, column) =>
  line.split("").map((risk, row) => ({
    risk: Number(risk),
    minRisk: Infinity,
    visited: false,
    column,
    row,
  }))
);

const fullGridRows = inputLines.length * 5;
const fullGridColumns = inputLines[0].length * 5;

const fullGrid = Array(fullGridRows)
  .fill(null)
  .map((_, row) =>
    Array(fullGridColumns)
      .fill(null)
      .map((_, column) => ({
        risk: 0,
        minRisk: Infinity,
        visited: false,
        column,
        row,
      }))
  );

for (let row = 0; row < grid.length; row++) {
  for (let column = 0; column < grid[row].length; column++) {
    let risk = grid[row][column].risk;
    
    for (let rowIncrement = 0; rowIncrement < 5; rowIncrement++) {
      const rowToUpdate = row + (grid.length * rowIncrement); // 0 5 10 15 20 ... 1 6 11... 4 
      let rowElementRisk = risk + rowIncrement;
      
      if (rowElementRisk > 9) {
        rowElementRisk -= 9;
      }
      
      for (let columnIncrement = 0; columnIncrement < 5; columnIncrement++) {
        const columnToUpdate = column + (grid.length * columnIncrement);
        let elementRisk = rowElementRisk + columnIncrement;
        
        if (elementRisk > 9) {
          elementRisk -= 9;
        }
        
        fullGrid[rowToUpdate][columnToUpdate].risk = elementRisk;
      } 
    }
  }
}

class Dijkstra {
  constructor(grid) {
    this.grid = grid;
  }

  neighbors = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
  ];

  getNeighbors(node) {
    const result = [];
    this.neighbors.forEach(([column, row]) => {
      const currColumn = node.column + column,
        currRow = node.row + row;
      if (this.grid[currColumn] && this.grid[currColumn][currRow] !== undefined) {
        result.push(this.grid[currColumn][currRow]);
      }
    });
    return result;
  }

  updateMinRisk(from, to) {
    const newRisk = from.minRisk + to.risk;
    if (newRisk < to.minRisk) {
      to.minRisk = newRisk;
    }
  }

  calculateMinRisk(from, to) {
    const queue = [];
    queue.push(from);

    while (queue.length > 0) {
      if (to.visited) {
        break;
      }

      const curr = queue.sort((a, b) => a.minRisk - b.minRisk).shift();
      if (curr.visited) {
        continue;
      }

      this.getNeighbors(curr).forEach(neighbor => {
        this.updateMinRisk(curr, neighbor);
        queue.push(neighbor);
      });

      curr.visited = true;
    }
  }
}

const from = fullGrid[0][0],
  to = fullGrid[fullGrid.length - 1][fullGrid[0].length - 1];
from.minRisk = 0;

const d = new Dijkstra(fullGrid);
d.calculateMinRisk(from, to);
console.log("minRisk:", to);
