from collections import deque

from pathlib import Path
lines = Path("12.txt").read_text().splitlines()

HeightMap = []

def getEligibleNeighbors(row, column):
    result = []
    currentHeight = HeightMap[row][column]

    for [dr, dc] in [[-1, 0], [0, -1], [1, 0], [0, 1]]:
        rowIndex, columnIndex = row + dr, column + dc
        if (-1 < rowIndex < len(HeightMap) and -1 < columnIndex < len(HeightMap[0])):
            newHeight = HeightMap[rowIndex][columnIndex]
            if(newHeight <= currentHeight + 1):
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

        row = []
        for char in list(line):
          if(char == 'S'):
            row.append(ord('a'))
          elif(char == 'E'):
            row.append(ord('z') + 1)
          else:
            row.append(ord(char))
        HeightMap.append(row)

    return [SRow, SColumn, ERow, EColumn]


SRow, SColumn, ERow, EColumn = parseInput()
print(SRow, SColumn, ERow, EColumn, HeightMap)

def findShortestPathBFS():
    queue = deque()
    visited = set()
    destinationHeight = ord('z') + 1

    queue.append((0, [SRow, SColumn]))
    
    while len(queue) > 0:
      distance, location = queue.popleft()
      row, column = location

      if(HeightMap[row][column] == destinationHeight):
        print('Found')
        return distance
      
      visited.add((row, column))

      for [rowIndex, columnIndex] in getEligibleNeighbors(row, column):
        if((rowIndex, columnIndex) not in visited):
          new_data = (distance + 1, [rowIndex, columnIndex])
          queue.append(new_data)

      

data = findShortestPathBFS()
print(data)
