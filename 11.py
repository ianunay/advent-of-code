from pathlib import Path
inputLines = Path("11.txt").read_text()

def getMonkeyBusiness(count):
  monkeys = []
  cycle_length = 1

  groupLines = inputLines.split("\n\n")

  for group in groupLines:
    lines = group.split('\n')
    testDivision = int(lines[3].split('by ')[1])
    details = {
      'items': list(map(int, (lines[1].split(':')[1]).split(','))),
      'operation': lines[2].split('= ')[1],
      'testDivision': int(lines[3].split('by ')[1]),
      'trueDestination': int(lines[4].split('monkey ')[1]),
      'falseDestination': int(lines[5].split('monkey ')[1]),
      'inspectedCount': 0
    }
    monkeys.append(details)
    cycle_length *= testDivision

  print('cycle_length:', cycle_length)

  for _round in range(count):
    print(_round)
    for monkey in monkeys:
      while len(monkey['items']) > 0:
        monkey['inspectedCount'] += 1
        item = monkey['items'].pop(0)
        operation = monkey['operation'].replace('old', str(item))
        result = eval(operation) // 3 if count < 10000 else eval(operation) % cycle_length
        if(result % monkey['testDivision'] == 0):
          monkeys[monkey['trueDestination']]['items'].append(result)
        else:
          monkeys[monkey['falseDestination']]['items'].append(result)

  print(monkeys)
  inspection = [m['inspectedCount'] for m in monkeys]
  inspection.sort()

  result = 1
  for i in inspection[-2:]:
    result *= i

  print('\n', 'monkey business:', result)

getMonkeyBusiness(20)

# part 2 solution hints:
# https://www.reddit.com/r/adventofcode/comments/zizi43/comment/iztt8mx/
# https://www.reddit.com/r/adventofcode/comments/zifqmh/comment/izv7hpx/

getMonkeyBusiness(10000)