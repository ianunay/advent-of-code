from pathlib import Path
lines = Path("5.txt").read_text().splitlines()

# Parse input and create stacks
def getInputStacks():
  initial_stacks_with_numbers = lines[:lines.index('')]
  initial_stacks = initial_stacks_with_numbers[:-1]
  number_of_stacks = int(initial_stacks_with_numbers[-1].split(' ')[-2])
  stacks = [[] for _ in range(number_of_stacks)]

  def replaceMultipleEmptyStrings(list):
      i = 0
      while i < len(list):
          if list[i] == "":
              del list[i:i+4]
              list.insert(i, "")
          i += 1

  for line in initial_stacks:
      values = line.split(' ')
      replaceMultipleEmptyStrings(values)
      for index, value in enumerate(values):
        if(value != ''):
          stacks[index].insert(0, value[1])
  
  return stacks

def getCrateMover9000Message():
  stacks = getInputStacks()
  instructions = lines[lines.index(''):][1:]

  for instruction in instructions:
    fields = instruction.split(' ')

    number_of_items_to_move = int(fields[1])
    src_stack = int(fields[3]) - 1
    dest_stack = int(fields[5]) - 1

    while number_of_items_to_move > 0:
      item = stacks[src_stack].pop()
      stacks[dest_stack].append(item)
      number_of_items_to_move -= 1

  message = ''.join(stack.pop() for stack in stacks)

  print(message)


def getCrateMover9001Message():
  stacks = getInputStacks()
  instructions = lines[lines.index(''):][1:]

  for instruction in instructions:
    fields = instruction.split(' ')

    number_of_items_to_move = int(fields[1])
    src_stack = int(fields[3]) - 1
    dest_stack = int(fields[5]) - 1

    tmp_stack = []
    while number_of_items_to_move > 0:
      item = stacks[src_stack].pop()
      tmp_stack.insert(0, item)
      number_of_items_to_move -= 1
    
    for item in tmp_stack:
      stacks[dest_stack].append(item)

  message = ''.join(stack.pop() for stack in stacks)

  print(message)


getCrateMover9000Message()
getCrateMover9001Message()