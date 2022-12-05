from pathlib import Path
lines = Path("3.txt").read_text().splitlines()


def getPriorityOfChar(char):
    if (char.isupper()):
        return ord(char) - 65 + 27
    else:
        return ord(char) - 96


def getPriority(str):
    string_length = len(str)
    first_half = str[:string_length // 2]
    first_half_set = set(first_half)
    second_half = str[string_length // 2:]

    for char in second_half:
        if (char in first_half_set):
            return getPriorityOfChar(char)


def prioritySum():
    priority = 0
    for line in lines:
        priority += getPriority(line)

    print(priority)


def groupBadgePrioritySum():
    priority = 0
    for i in range(0, len(lines), 3):
        set1 = set(lines[i])
        set2 = set(lines[i+1])
        set3 = set(lines[i+2])

        intersection = set1.intersection(set2, set3)
        priority += getPriorityOfChar("".join(intersection))

    print(priority)


prioritySum()
groupBadgePrioritySum()
