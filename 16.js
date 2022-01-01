// --- Day 16: Packet Decoder --- https://adventofcode.com/2021/day/16

const fs = require("fs");
const Tn = fs.readFileSync("./16.input.txt", "utf-8");
const TnBits = Tn.split("")
  .map(h => parseInt(h, 16).toString(2).padStart(4, "0"))
  .join("");

const hexToBinary = x => parseInt(x, 16).toString(2).padStart(4, "0");
const slice = (str, index, count) => str.slice(index, index + count);
const toDec = x => parseInt(x, 2);

function parseTransmission(transmission) {
  let hexIndex = 0;
  let buffer = "";
  let done = false;
  while (!done) {
    // D2FE28 --> D2
    const header = transmission.slice(hexIndex, hexIndex + 2);
    hexIndex += 2;
    // D2 --> 11010010
    const headerBits = hexToBinary(header);
    // 110 --> 6
    const version = toDec(headerBits.slice(0, 3));
    // 100 --> 4
    const id = toDec(headerBits.slice(3, 6));
    // store 10
    buffer = headerBits.slice(6, 8);

    // literal value
    if (id === 4) {
      let literalValue;
      let localBuffer = buffer;
      let continueParsing = true;
      while (continueParsing) {
        // 10 (F --> 1111) ==> 101111
        localBuffer += hexToBinary(transmission[hexIndex]);
        hexIndex++;

        if (localBuffer[0] !== "0") continueParsing = false;

        literalValue += localBuffer.slice(1, 5);
        localBuffer = localBuffer.slice(5);
      }
    } else {
      // Operator
      // 10 --> 1
      const lengthTypeId = buffer[0];
      // 10 --> 0
      buffer = buffer.slice(1);

      let length = lengthTypeId === "0" ? 15 : 11;
    }
  }
}

/**
 

Transmission (HEX) => a single packet at its outermost layer

  1. Standard header

  1st 3 bits -> packet version

  2nd 3 bits -> type ID


  type id 4 => literal value => single binary number

  any other type id => operator packet
    - performs calc. on 1 or more sub-packets
    - length type ID
      - bit right after the packet header
      - 0 => next 15 bits
      - 1 => next 11 bits
    - after type ID + 15 bit / 11 bit field, sub packets appear
  


*/

const versions = [];
function parseStream(transmission, limit = Infinity) {
  let index = 0;
  // D2FE28 ---> 110100101111111000101000
  while (index < transmission.length && limit > 0) {
    // 110 --> 6
    const version = toDec(transmission.slice(index, index + 3));
    index += 3;

    versions.push(version);

    // 100 --> 4
    const id = toDec(transmission.slice(index, index + 3));
    index += 3; // index = 6 remaining = 101111111000101000

    if (id === 4) {
      let literalValue = "";

      let lastGroupReached = false;
      while (!lastGroupReached) {
        if (transmission[index] === "0") {
          lastGroupReached = true;
        }
        index++;
        literalValue += transmission.slice(index, index + 4);
        index += 4;
      }
    } else {
      const typeId = transmission[index];
      index++;
      if (typeId === "0") {
        const length = toDec(transmission.slice(index, index + 15));
        index += 15;
        parseStream(transmission.slice(index, index + length));
        index += length;
      } else {
        const numberOfSubPackets = toDec(transmission.slice(index, index + 11));
        index += 11;
        const parsedLength = parseStream(transmission.slice(index), numberOfSubPackets);
        index += parsedLength;
      }
    }
    const remaining = transmission.slice(index);
    if (toDec(remaining) === 0) {
      break;
    }
    limit--;
  }

  return index;
}

parseStream(TnBits);
console.log(versions);
console.log('sum:', versions.reduce((a,b) => a + b, 0));
