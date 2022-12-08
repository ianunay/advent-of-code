from pathlib import Path
lines = Path("7.txt").read_text().splitlines()


def moveUpDir(path):
    last_folder = path.rfind('/')
    return path[:last_folder]


fs = {"/": {
    "dirs": [],
    "files": [],
    "size": 0
}}


def addSizeToParents(path, size):
    path = moveUpDir(path)
    parts = path.split('/')
    acc = ''
    for part in parts:
        prefix = "" if acc == "/" else "/"
        acc += prefix + part
        fs[acc]['size'] += size


def parseInput():
    curr_path = "/"

    # ignore first line
    line_number = 1
    while line_number < len(lines):
        line = lines[line_number].split(' ')

        # its an operation
        if (line[0] == "$"):
            if (line[1] == "cd"):
                if (line[2] == ".."):
                    curr_path = moveUpDir(curr_path)
                else:
                    prefix = "" if curr_path == "/" else "/"
                    curr_path += prefix + line[2]
                line_number += 1
            elif (line[1] == "ls"):
                line_number += 1
                size = 0
                files = []
                dirs = []
                while line_number < len(lines) and lines[line_number][0] != "$":
                    line = lines[line_number].split(' ')
                    if (line[0] == "dir"):
                        dirs.append(line[1])
                    else:
                        files.append(line[1])
                        size += int(line[0])
                    line_number += 1
                fs[curr_path] = {
                    "dirs": dirs,
                    "files": files,
                    "size": size
                }
                if(curr_path != '/'):
                  addSizeToParents(curr_path, size)


def findSumOfSmallFolders():
  total_size = 0
  for data in fs.values():
    if data["size"] <= 100000:
      total_size += data["size"]
  print(total_size)

def findFolderToDelete():
  sizes = []
  for data in fs.values():
    sizes.append(data["size"])
  
  sizes.sort()
  total_used_space = fs["/"]["size"]
  total_unused_space = 70000000 - total_used_space

  for size in sizes:
    if(size + total_unused_space >= 30000000):
      print(size)
      break


parseInput()
# print(fs)
findSumOfSmallFolders()
findFolderToDelete()
