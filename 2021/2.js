// Dive - https://adventofcode.com/2021/day/2

const fs = require('fs');
const input = fs.readFileSync('./2.input.txt', 'utf-8').split('\n');

(function calculatePosition() {
  let forward = 0, depth = 0;
  input.forEach(line => {
    const [command, value] = line.split(' ');
    switch (command) {
      case 'forward':
        forward += Number(value);
        break;
      case 'up':
        depth -= Number(value);
        break;
      case 'down':
        depth += Number(value);
        break;
    
      default:
        break;
    }
  });

  console.log('forward: ', forward, 'depth: ', depth);
  console.log('product: ', forward * depth);

})();

(function calculatePosition2() {
  let forward = 0, depth = 0, aim=0;
  input.forEach(line => {
    const [command, value] = line.split(' ');
    switch (command) {
      case 'forward':
        forward += Number(value);
        depth += value * aim; 
        break;
      case 'up':
        aim -= Number(value);
        break;
      case 'down':
        aim += Number(value);
        break;
    
      default:
        break;
    }
  });

  console.log('forward2: ', forward, 'depth2: ', depth);
  console.log('product2: ', forward * depth);

})();