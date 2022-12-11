from collections import deque

from pathlib import Path
lines = Path("10.txt").read_text().splitlines()

def isImportantCycle(cycle):
  total = 20

  while cycle >= total:
    if(total == cycle):
      return True
    total += 40
  return False

def printPlot(plot):
  for line in plot:
    print(''.join(line))

def toCoordinates(index):
  row = index // 40
  column = index % 40
  return [row, column]

def run():
  cycle = 0
  X = 1
  queue = deque()
  signal_strength = 0
  plot = [['.' for _ in range(40)] for _ in range(6)]
  sprite = [0, 1, 2]

  for line in lines:
    if(line == "noop"):
      queue.append("noop")
    else:
      _, val = line.split(" ")
      queue.append("noop")
      queue.append(int(val))

  while len(queue) > 0:
    row, column = toCoordinates(cycle)
    sprite = [X - 1, X, X + 1]
    if column in sprite:
      plot[row][column] = "#"
    cycle += 1

    if(isImportantCycle(cycle)):
      signal_strength += (cycle * X)

    val = queue.popleft()
    if(val != "noop"):
      X += val

  print('signal_strength:', signal_strength)
  printPlot(plot)

run()