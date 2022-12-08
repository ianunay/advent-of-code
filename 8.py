from pathlib import Path
lines = Path("8.txt").read_text().splitlines()


HeightMap = [list(map(int, i)) for i in lines]
trees_on_perimeter = 2 * (len(HeightMap) + len(HeightMap[0]) - 2)
columnLength, rowLength = len(HeightMap[0]), len(HeightMap)


def getKey(rowIdx, columnIdx):
    return str(rowIdx) + '-' + str(columnIdx)


def isBoundary(rowIdx, columnIdx):
    return rowIdx == 0 or columnIdx == 0 or rowIdx == rowLength - 1 or columnIdx == columnLength - 1


def totalVisibleTrees():

    visibleSet = set()

    # Traverse Rows from left and right
    rowIdx = 0
    while rowIdx < rowLength:
      leftMax, rightMax = HeightMap[rowIdx][0], HeightMap[rowIdx][columnLength - 1]
      for columnIdx, value in enumerate(HeightMap[rowIdx]):
          if (not isBoundary(rowIdx, columnIdx) and value > leftMax):
              leftMax = value
              visibleSet.add(getKey(rowIdx, columnIdx))

      for columnIdx, value in reversed(list(enumerate(HeightMap[rowIdx]))):
          if (not isBoundary(rowIdx, columnIdx) and value > rightMax):
              rightMax = value
              visibleSet.add(getKey(rowIdx, columnIdx))
      rowIdx += 1
    
    # Traverse columns from top and bottom
    columnIdx = 0
    while columnIdx < columnLength:
      topMax, bottomMax = HeightMap[0][columnIdx], HeightMap[rowLength - 1][columnIdx]

      for rowIdx, value in enumerate(HeightMap):
        if(not isBoundary(rowIdx, columnIdx) and value[columnIdx] > topMax):
          topMax = value[columnIdx]
          visibleSet.add(getKey(rowIdx, columnIdx))

      for rowIdx, value in reversed(list(enumerate(HeightMap))):
        if(not isBoundary(rowIdx, columnIdx) and value[columnIdx] > bottomMax):
          bottomMax = value[columnIdx]
          visibleSet.add(getKey(rowIdx, columnIdx))
      columnIdx += 1

    print(trees_on_perimeter + len(visibleSet))


def highestScenicScore():

  highest_score = 0

  for rowIdx, row in enumerate(HeightMap):
    for columnIdx, value in enumerate(row):
      if(isBoundary(rowIdx, columnIdx)):
        continue

      topScore, bottomScore, leftScore, rightScore = 0, 0, 0, 0
      topIdx, bottomIdx, leftIdx, rightIdx = 1, 1, 1, 1
      continueTraversal = [True, True, True, True]
      # Top traversal
      while continueTraversal[0] and rowIdx - topIdx >= 0:
        if(value <= HeightMap[rowIdx - topIdx][columnIdx]):
          continueTraversal[0] = False
        topScore += 1
        topIdx += 1

      # Bottom traversal
      while  continueTraversal[1] and rowIdx + bottomIdx <= rowLength - 1:
        if(value <= HeightMap[rowIdx + bottomIdx][columnIdx]):
          continueTraversal[1] = False
        bottomScore += 1
        bottomIdx += 1
      
      # Left traversal
      while continueTraversal[2] and columnIdx - leftIdx >= 0:
        if(value <= HeightMap[rowIdx][columnIdx - leftIdx]):
          continueTraversal[2] = False
        leftScore += 1
        leftIdx += 1

      # Right traversal
      while continueTraversal[3] and columnIdx + rightIdx <= columnLength - 1:
        if(value <= HeightMap[rowIdx][columnIdx + rightIdx]):
          continueTraversal[3] = False
        rightScore += 1
        rightIdx += 1
      
      score = topScore * bottomScore * leftScore * rightScore
      if score > highest_score:
        highest_score = score
  
  print(highest_score)

totalVisibleTrees()
highestScenicScore()
