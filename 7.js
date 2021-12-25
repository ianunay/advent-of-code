// --- Day 7: The Treachery of Whales --- https://adventofcode.com/2021/day/7

const fs = require("fs");
const input = fs.readFileSync("./7.input.txt", "utf-8");

function minFuel(input) {
  const positions = input.split(',').map(Number);
  let min = Infinity;
  const maxPosition = Math.max(...positions);
  console.log(maxPosition);

  for (let i = 0; i <= maxPosition; i++) {
    let totalFuel = 0;
    for (let j = 0; j < positions.length; j++) {
      totalFuel += Math.abs(i - positions[j]);
    }
    min = Math.min(totalFuel, min);
  }

  return min;
}

function minFuel2(input) {
  const positions = input.split(',').map(Number);
  let min = Infinity;
  const maxPosition = Math.max(...positions);

  for (let i = 0; i <= maxPosition; i++) {
    let totalFuel = 0;
    for (let j = 0; j < positions.length; j++) {
      const fuel = fuelBetween(i, positions[j]);
      totalFuel += fuel;
    }
    min = Math.min(totalFuel, min);
  }

  return min;
}

const fuelMap = new Map();

function fuelBetween(a, b) {
  const difference = Math.abs(a - b);

  if (fuelMap.has(difference)) {
    return fuelMap.get(difference);
  }

  let fuel = 0;
  for (let index = 0; index <= difference; index++) {
    fuel += index;
  }

  fuelMap.set(difference, fuel);
  return fuel;
}

console.log('min fuel required: ', minFuel(input));
console.log('min fuel required: ', minFuel2(input));
