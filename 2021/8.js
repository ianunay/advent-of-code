// --- Day 8: Seven Segment Search --- https://adventofcode.com/2021/day/8

const fs = require("fs");
const input = fs.readFileSync("./8.input.txt", "utf-8");

const uniqueDigitLengths = [2, 4, 3, 7];

const lines = input.split("\n");

function part1() {
  const outputs = lines.map(l => l.split(" | ")[1]);
  const instances = outputs.reduce(
    (acc, outputLine) => [...acc, ...outputLine.split(" ")],
    []
  );

  let totalInstances = 0;

  instances.forEach(instance => {
    if (uniqueDigitLengths.includes(instance.length)) {
      totalInstances++;
    }
  });

  console.log("total instances: ", totalInstances);
}

/**


acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab

2 digits ----> 1 ----> ab
4 digits ----> 4 ----> eafb
3 digits ----> 7 ----> dab
7 digits ----> 8 ----> acegfb


top, top-left, middle, bottom, bottom-left
2,3,5 ===> 2 less
6,9   ===> 1 less



7 - 1 ===> top
4 - 1 ===> top-left, middle
8 - 4 ===> top(7-1), bottom-left, bottom

// 8 - 1 ===> top(7-1), top-left(4-1), middle(7-4), bottom-left, bottom
// 8 - 7 ===> top-left(4-1), middle(7-4), bottom-left, bottom

no middle ===> 0
no top-left ===> 2 and 3 ===> no (bottom, bottom-left) ===> 3 (bottom, bottom-left)


(3 + top-left) ===> 9
(same length as 9) ===> 6

left over ===> 5

*/

function getOutPutOfLine(line) {
  const signalMap = {};
  const valueMap = {};
  const [signals, output] = line.split(" | ");
  let [top, topLeft, topRight, middle, bottomLeft, bottomRight, bottom] =
    Array(7).fill(null);
  
  let fiveSegments = []; // 2,3,5
  let sixSegments = []; // 0,6,9

  // filter out 1,4,7,8 and add them to the map
  signals.split(' ').forEach(signal => {
    switch (signal.length) {
      case 2:
        signalMap[signal] = "1";
        valueMap[1] = signal;
        break;
      case 4:
        signalMap[signal] = "4";
        valueMap[4] = signal;
        break;
      case 3:
        signalMap[signal] = "7";
        valueMap[7] = signal;
        break;
      case 7:
        signalMap[signal] = "8";
        valueMap[8] = signal;
        break;
      case 5:
        fiveSegments.push(signal);
        break;
      case 6:
        sixSegments.push(signal);
        break;
      default:
        break;
    }
  });
  
  top = findDiff(valueMap[7], valueMap[1]);
  const bottomAndBottomLeft = findDiff(valueMap[8], valueMap[4] + top);

  const [b, bl] = bottomAndBottomLeft.split('');
  const two = fiveSegments.filter(signal => (signal.includes(b) && signal.includes(bl)))[0];
  signalMap[two] = "2";
  fiveSegments = fiveSegments.filter(signal => signal !== two);
  const topPartOfTwo = findDiff(two, bottomAndBottomLeft);
  middle = findDiff(topPartOfTwo, valueMap[7]);
  const topAndTopRight = findDiff(topPartOfTwo, middle);
  const [t, tr] = topAndTopRight.split('');

  fiveSegments.forEach(signal => {
    if (signal.includes(t) && signal.includes(tr)) {
      signalMap[signal] = "3";
    } else {
      signalMap[signal] = "5";
    }
  });

  sixSegments.forEach(signal => {
    if (!signal.includes(middle)) {
      signalMap[signal] = "0";
    } else if (signal.includes(b) && signal.includes(bl)) {
      signalMap[signal] = "6";
    } else {
      signalMap[signal] = "9";
    }
  })  

  const op = output.split(' ').reduce((acc, signal) =>{ 
    return acc + getMatchingValue(signalMap, signal);
  }, "")

  return Number(op);
}

function getMatchingValue(signalMap, signal) {
  for (const key in signalMap) {
    if (sameChars(signal, key)) {
      return signalMap[key];
    }   
  }
}

function findDiff(largerString, smallerString) {
  return largerString.split('').filter(c => !smallerString.includes(c)).join('');
}

function sameChars(str1, str2) {
  const first = str1.split('').sort().join();
  const second = str2.split('').sort().join();
  return first === second;
}

function part2() {
  let total = 0;
  lines.forEach(line => {
    total += getOutPutOfLine(line);
  });
  console.log("total output: ", total);
}

part1();
part2();
