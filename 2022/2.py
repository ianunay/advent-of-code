from pathlib import Path
input_text = Path("2.txt").read_text()

lines = input_text.splitlines()


def getScore(opponent_choice, self_choice):
    scoreMap = {"X": 1, "Y": 2, "Z": 3}
    choiceMap = {"X": "A", "Y": "B", "Z": "C"}

    if (opponent_choice == choiceMap[self_choice]):
        return scoreMap[self_choice] + 3

    # loose cases:
    # opponent_choice is rock and self_choice is scissors
    if (opponent_choice == "A" and self_choice == "Z"

       # opponent_choice is paper and self_choice is rock
        or opponent_choice == "B" and self_choice == "X"

        # opponent_choice is scissors and self_choice is paper
            or opponent_choice == "C" and self_choice == "Y"
        ):
        return scoreMap[self_choice]
    # else its a win case
    else:
        return scoreMap[self_choice] + 6


def getTotalScore(part):
    total_score = 0
    for line in lines:
        opponent_choice, second_arg = line.split(" ")
        score = getScore(opponent_choice,
                         second_arg) if part == 1 else getScoreFromDecision(opponent_choice, second_arg)
        total_score += score

    print(total_score)


def getScoreFromDecision(opponent_choice, decision):
    wins = {"A": "Y", "B": "Z", "C": "X"}
    loses = {"A": "Z", "B": "X", "C": "Y"}
    draws = {"A": "X", "B": "Y", "C": "Z"}

    if (decision == "X"):
        return getScore(opponent_choice, loses[opponent_choice])
    elif (decision == "Y"):
        return getScore(opponent_choice, draws[opponent_choice])
    else:
        return getScore(opponent_choice, wins[opponent_choice])


getTotalScore(1)
getTotalScore(2)
