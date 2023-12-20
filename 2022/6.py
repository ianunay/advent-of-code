from pathlib import Path
input_str = Path("6.txt").read_text()


def getStartMarker(length):
  index = length
  while index <= len(input_str):
    substr = input_str[index-length:index]
    substr_set = set(substr)
    if(len(substr) == len(substr_set)):
      break
    index += 1

  print(index)


getStartMarker(4)
getStartMarker(14)