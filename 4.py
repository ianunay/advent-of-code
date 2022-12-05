from pathlib import Path
lines = Path("4.txt").read_text().splitlines()


def assignmentPairFullOverlapCount():
    count = 0
    for line in lines:
        group1, group2 = line.split(",")
        g1Start, g1End = map(int, group1.split("-"))
        g2Start, g2End = map(int, group2.split("-"))

        # group1 contains group2 or
        # # group2 contains group1
        if ((g1Start <= g2Start and g1End >= g2End) or
                (g2Start <= g1Start and g2End >= g1End)):
            count += 1
    print(count)

def assignmentPairOverlapCount():
  count = 0
  for line in lines:
    group1, group2 = line.split(",")
    g1Start, g1End = map(int, group1.split("-"))
    g2Start, g2End = map(int, group2.split("-"))

    if((g1Start <= g2Start and g2Start <= g1End) or
      (g2Start <= g1Start and g1Start <= g2End)):
      count += 1
  
  print(count)

assignmentPairFullOverlapCount()
assignmentPairOverlapCount()