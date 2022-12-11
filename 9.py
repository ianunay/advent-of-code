from pathlib import Path
lines = Path("9.txt").read_text().splitlines()


def moveRope(start, end):
    Hx, Hy = start
    Tx, Ty = end
    Dx, Dy = Hx - Tx, Hy - Ty
    if (Dx == 2 or Dx == -2):
        Tx += 1 if Dx == 2 else -1
        if (Dy != 0):
            Ty += 1 if Dy > 0 else -1

    elif (Dy == 2 or Dy == -2):
        Ty += 1 if Dy == 2 else -1
        if (Dx != 0):
            Tx += 1 if Dx > 0 else -1

    return [Tx, Ty]


def moveOneRope():
    # Head
    Hx, Hy = 0, 0
    # Tail
    Tx, Ty = 0, 0

    visitedSet = set()
    visitedSet.add((Tx, Ty))

    for line in lines:
        direction, length = line.split(' ')
        for _ in range(int(length)):
            if (direction == 'U'):
                Hy += 1

            elif (direction == 'D'):
                Hy -= 1

            elif (direction == 'L'):
                Hx -= 1

            elif (direction == 'R'):
                Hx += 1

            Tx, Ty = moveRope([Hx, Hy], [Tx, Ty])
            visitedSet.add((Tx, Ty))
    print(len(visitedSet))


def moveKnots():
    knots = [[0, 0] for _ in range(9)]
    Hx, Hy = 0, 0

    visitedSet = set()
    visitedSet.add((0, 0))

    for line in lines:
        direction, length = line.split(' ')
        for _ in range(int(length)):
            if (direction == 'U'):
                Hy += 1

            elif (direction == 'D'):
                Hy -= 1

            elif (direction == 'L'):
                Hx -= 1

            elif (direction == 'R'):
                Hx += 1

            knots[0][0], knots[0][1] = moveRope([Hx, Hy], knots[0])

            for i in range(8):
              knots[i+1][0], knots[i+1][1] = moveRope(knots[i], knots[i+1])

            visitedSet.add((knots[8][0], knots[8][1]))

    print(len(visitedSet))


moveOneRope()
moveKnots()
