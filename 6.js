// --- Day 6: Lanternfish --- https://adventofcode.com/2021/day/6

const fs = require("fs");
const input = fs.readFileSync("./6.input.txt", "utf-8");

// brute force which causes "JavaScript heap out of memory"
function part1(days) {
  const fishes = input.split(',');
  for (let day = 1; day <= days; day++) {
    for (let index = 0; index < fishes.length; index++) {
      const counter = fishes[index];
  
      if (counter === 0) {
        fishes[index] = 6;
        fishes.push(9);
      } else {
        fishes[index]--;
      }
    }
  }
  console.log('total fish: ', fishes.length);
}


function fishCount(days) {
  const fishes = input.split(',');
  const buckets = new Array(9).fill(0);
  fishes.forEach(fish => { buckets[fish]++; });

  for (let day = 0; day < days; day++) {
    const birthingFishes = buckets.shift();
    buckets.push(birthingFishes);
    buckets[6] += birthingFishes;
  }

  const totalFish = buckets.reduce((acc, bucket) => acc + bucket, 0);
  console.log('total fish: ', totalFish);
}

fishCount(80);
fishCount(256);