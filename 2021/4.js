// --- Day 4: Giant Squid --- https://adventofcode.com/2021/day/4

const fs = require('fs');
const input = fs.readFileSync('./4.input.txt', 'utf-8').split('\n\n');

const calls = input[0].split(',');
const boards = [];
const results = [];

for (let index = 1; index < input.length; index++) {
  const board = input[index];
  
  const lines = board.split('\n');
  const parsedBoard = lines.map(l => l.split(' ').filter(v => v).map(v => ({ value: v, checked: false })));

  boards.push({
    numbers: parsedBoard,
    done: false
  });
}

// board = [[{1},{2},{3},{4},{5}], [{1},{2},{3},{4},{5}], [{1},{2},{3},{4},{5}], [{1},{2},{3},{4},{5}]]
function checkWin(boardIndex, call) {
  let result;
  const board = boards[boardIndex].numbers;

  for (let i = 0; i < 5; i++) {

    let rowFilled = true;
    let columnFilled = true;

    for (let j = 0; j < 5; j++) {
      const rowElement = board[i][j];
      const columnElement = board[j][i];
      
      if (rowElement.value === call) {
        rowElement.checked = true
      }
      if (!rowElement.checked) {
        rowFilled = false;
      }

      if (columnElement.value === call) {
        columnElement.checked = true
      }
      if (!columnElement.checked) {
        columnFilled = false;
      }
    }

    if (rowFilled || columnFilled) {
      result = sumOfOthers(board) * call;
    }
  }

  return result;
}

function sumOfOthers(board) {
  let sum = 0;
  board.forEach(row => {
    row.forEach(item => {
      if (!item.checked) {
        sum += Number(item.value);
      }
    })
  })
  return sum;
}

for (let i = 0; i < calls.length; i++) {
  const call = calls[i];
  for (let j = 0; j < boards.length; j++) {
    if (boards[j].done) {
      continue;
    }
    const result = checkWin(j, call);
    if (result) {
      results.push(result);
      boards[j].done = true;
    }
  }
}

console.log(results[0], results.pop());