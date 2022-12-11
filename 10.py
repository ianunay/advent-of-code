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

def getSignalStrength():
  cycle = 0
  X = 1
  queue = deque()
  signal_strength = 0

  for line in lines:
    if(line == "noop"):
      queue.append("noop")
    else:
      _, val = line.split(" ")
      queue.append("noop")
      queue.append(int(val))

  while len(queue) > 0:
      cycle += 1
      print(cycle, X)
      if(isImportantCycle(cycle)):
        signal_strength += (cycle * X)

      val = queue.popleft()
      if(val != "noop"):
        X += val

  print(signal_strength)

getSignalStrength()