import heapq as hq
from pathlib import Path
input_text = Path("1.txt").read_text()


lines = input_text.split("\n")
lines.append("")


def GetMaxCalories():
    max_calories = 0
    current_total_cal = 0

    for line in lines:
        if line == "":
            max_calories = max_calories if max_calories > current_total_cal else current_total_cal
            current_total_cal = 0
        else:
            current_total_cal += int(line)

    print("max_calories:", max_calories)


def GetTop3MaxCalorieSum():
    max_heap = [0, 0, 0]
    current_total_cal = 0

    for line in lines:
        if line == "":

            if current_total_cal > max_heap[0]:
                max_heap[0] = current_total_cal
                hq.heapify(max_heap)


            current_total_cal = 0
        else:
            current_total_cal += int(line)

    print("Top 3 max_calories are:", max_heap)
    print("Top 3 max_calories sum:", sum(max_heap))




GetMaxCalories()
GetTop3MaxCalorieSum()
