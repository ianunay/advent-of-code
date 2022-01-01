// --- Day 14: Extended Polymerization --- https://adventofcode.com/2021/day/14

const fs = require("fs");
let [template, rules] = fs
  .readFileSync("./14.input.txt", "utf-8")
  .split("\n\n");
const ruleMap = new Map(rules.split("\n").map(line => line.split(" -> ")));

const TOTAL_STEPS = 4;

// for (let index = 0; index < TOTAL_STEPS; index++) {
//   template = polymerize2(template, ruleMap);
//   // console.log(index, template.length);
//   // console.log(template, '\n\n\n\n\n')
// }


console.log(getAnswer(template));
combinations(ruleMap);
// console.time("calculate insert locations start");
// console.timeEnd("calculate insert locations start");

function polymerize(template, rulesMap) {
  const insertLocations = findInsertLocations(template, rulesMap);
  let totalInserted = 0;
  insertLocations.forEach(l => {
    const position = l.at + totalInserted;
    template = [
      template.slice(0, position),
      l.char,
      template.slice(position),
    ].join("");
    totalInserted++;
  });
  return template;
}

function polymerize2(template, rulesMap) {
  let newTemplate = '';
  for (let index = 0; index < template.length; index++) {
    const subStr = template[index] + template[index+1]
    newTemplate += template[index];
    if (rulesMap.has(subStr)) {
      newTemplate += rulesMap.get(subStr);
    }
  }
  return newTemplate;
}

function splitWord(str) {
  const result = [];
  for (let index = 0; index < str.length - 1; index++) {
    result.push(
      template[index] + template[index+1]
    )
  }
  return result;
}

function findInsertLocations(template, rulesMap) {
  const result = [];
  for (let index = 0; index < template.length; index++) {
    const subStr = template.substring(index, index+2);
    if (rulesMap.has(subStr)) {
      result.push({
        at: index + 1,
        char: rulesMap.get(subStr),
      });
    }
  }
  return result;
}

function getAnswer(str) {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const counts = Array(26).fill(0);
  str.split('').forEach(char => {
    const index = alphabets.indexOf(char);
    counts[index]++;
  });

  const sortedCounts = counts.filter(c => c).sort((a,b) => a - b);

  return sortedCounts[sortedCounts.length - 1] - sortedCounts[0];
}

function combinations(rulesMap) {
  const valuesArray = Array.from(rulesMap.values());
  const valCharCount = {};
  const set = new Set();
  for (let i = 0; i < valuesArray.length; i++) {
    if (valCharCount[valuesArray[i]]) {
      valCharCount[valuesArray[i]]++;
    } else {
      valCharCount[valuesArray[i]] = 1;
    }
    for (let j = 0; j < valuesArray.length; j++) {
      set.add(`${valuesArray[i]}${valuesArray[j]}`);
    }
  }
  console.log(set);
  const charCount = {};
  set.forEach(key => {
    key.split('').forEach(c => {
      if (charCount[c]) {
        charCount[c]++;
      } else {
        charCount[c] = 1;
      }
    })
  });

  console.log(charCount);
  console.log(valCharCount);
}



/**


count = {
  N = 2,
  C = 1,
  B = 1
}

(NCN) (NCCN)
N 
N    -----> NC
            CN


N
C   ------> NB
            BC


C
B   ------> CH
            HB


count = {
  N = 2,
  C = 2,
  B = 2,
  H = 1
}

count = {
  'BB' = 0
  'BN' = 0
  'BH' = 0
  'BC' = 1
  'NB' = 1
  'NN' = 0
  'NH' = 0
  'NC' = 1
  'HB' = 1
  'HN' = 0
  'HH' = 0
  'HC' = 0
  'CB' = 0
  'CN' = 1
  'CH' = 1
  'CC' = 0
}

c = -1
B = -1
H = -1

 NC CN NB BC  CH HB

(CB) was the last ====> add one H(B)

 N = 2
 C = 2
 B = 2
 H = 1

 N = 3
 C = 4
 B = 3
 H = 2


 N = 3
 C = 3
 B = 2
 H = 1

 N = 2
 C = 2
 B = 2
 H = 1
 */