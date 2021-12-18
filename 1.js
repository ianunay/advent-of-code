// Sonar sweep - https://adventofcode.com/2021/day/1

const fs = require('fs');
const input = fs.readFileSync('./1.input.txt', 'utf-8').split('\n');

(function numberOfDepthIncreases() {
  let result = 0;
  for (let index = 1; index < input.length; index++) {
    if (Number(input[index]) > Number(input[index - 1])) {
      result++; 
    }
  }

  console.log('result1: ', result);
  return result;
})();

(function slidingNumberOfDepthIncreases() {
  let result = 0;
  for (let i = 3, j = 2; i < input.length; i++, j++) {
    if(last3Sum(i) > last3Sum(j)) result++;
  }

  console.log('result2: ', result);
  return result;
})();

function last3Sum(index) {
  return Number(input[index]) + Number(input[index - 1]) + Number(input[index - 2]);
}