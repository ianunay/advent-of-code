from collections import deque

from pathlib import Path
lines = Path("12.txt").read_text().splitlines()

HeightMap = []

def getEligibleNeighbors(row, column):
    result = []
    currentVal = ord(HeightMap[row][column])
    
    if(currentVal == 83): # set 'S' to 'a'
      currentVal = 97

    for [dr, dc] in [[-1, 0], [0, -1], [1, 0], [0, 1]]:
        rowIndex, columnIndex = row + dr, column + dc
        if (-1 < rowIndex < len(HeightMap) and -1 < columnIndex < len(HeightMap[0])):
            val = ord(HeightMap[rowIndex][columnIndex])
            if(val == 69): # set 'E' to 'z'
              val = 122
            if(val <= currentVal + 1):
              result.append([rowIndex, columnIndex])
    
    return result


def parseInput():
    for rowIndex, line in enumerate(lines):

        if 'S' in line:
            SIndex = line.index('S')
            SRow = rowIndex
            SColumn = SIndex

        if 'E' in line:
            EIndex = line.index('E')
            ERow = rowIndex
            EColumn = EIndex

        row = list(line)
        HeightMap.append(row)

    return [SRow, SColumn, ERow, EColumn]


SRow, SColumn, ERow, EColumn = parseInput()
print(SRow, SColumn, ERow, EColumn)

def findShortestPathBFS():
    queue = deque()
    visited = set()

    for item in getEligibleNeighbors(SRow, SColumn):
      queue.append([item])
    
    while len(queue) > 0:
      path = queue.popleft()
      row, column = path[-1]

      if(HeightMap[row][column] == 'E'):
        print('Found')
        return path
      
      visited.add((row, column))

      for [rowIndex, columnIndex] in getEligibleNeighbors(row, column):
        if((rowIndex, columnIndex) not in visited):
          new_path = list(path)
          new_path.append([rowIndex, columnIndex])
          print(HeightMap[rowIndex][columnIndex])
          queue.append(new_path)

      

path = findShortestPathBFS()
print(path, [HeightMap[row][column] for [row, column] in path], len(path))
