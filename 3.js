// --- Day 3: Binary Diagnostic --- https://adventofcode.com/2021/day/3

const fs = require('fs');
const input = fs.readFileSync('./3.input.txt', 'utf-8').split('\n');

// 111011110110

const TOTAL_BIT_COUNT = 12;

let gammaFirstBit, epsilonFirstBit;

(function powerConsumption() {
  const collector = Array.from(Array(TOTAL_BIT_COUNT)).map(_ => ({0: 0, 1: 0}));
  let gamma = "", epsilon = "";
  input.forEach(line => {
    const bits = line.split("");
    bits.forEach((bit, index) => {
      collector[index][bit]++;
    });
  });

  collector.forEach(pos => {
    const [minBit, maxBit] = pos[0] > pos[1] ? ["1","0"] : ["0","1"];
    gamma += maxBit;
    epsilon += minBit;
  })

  gammaFirstBit = gamma[0];
  epsilonFirstBit = epsilon[0];
  const gammaDecimal = parseInt(gamma, 2);
  const epsilonDecimal = parseInt(epsilon, 2);
  console.log("gamma: ", gamma, " decimal: ", gammaDecimal);
  console.log("epsilon: ", epsilon, " decimal: ", epsilonDecimal);
  console.log("Power consumption: ", gammaDecimal * epsilonDecimal, '\n');
})();

function commonBitCalculation(array, pos, type) {
  const counter = {0:0, 1:0};
  array.forEach(value => {
    counter[value[pos]]++
  });

  if (type === "o2") {
    return counter[1] >= counter[0] ? 1 : 0;
  } else {
    return counter[1] >= counter[0] ? 0 : 1;
  }
}

(function lifeSupportRating() {
  let oxygenRatingCollector = input.filter(value => value[0] === gammaFirstBit);
  let co2RatingCollector = input.filter(value => value[0] === epsilonFirstBit);

  let index = 1;
  while (oxygenRatingCollector.length > 1) {
    const commonBit = commonBitCalculation(oxygenRatingCollector, index, "o2");
    oxygenRatingCollector = [...oxygenRatingCollector.filter(value => Number(value[index]) === commonBit)];
    index++;
  }

  index = 1;
  while(co2RatingCollector.length > 1) {
    const unCommonBit = commonBitCalculation(co2RatingCollector, index, "co2");
    co2RatingCollector = [...co2RatingCollector.filter(value => Number(value[index]) === unCommonBit)];
    index++;
  }

  const o2Decimal = parseInt(oxygenRatingCollector[0], 2);
  const co2Decimal = parseInt(co2RatingCollector[0], 2);

  console.log("o2: ", oxygenRatingCollector[0], " decimal: ", o2Decimal);
  console.log("co2: ", co2RatingCollector[0], " decimal: ", co2Decimal);
  console.log("Life support rating: ", o2Decimal * co2Decimal, '\n');

})();