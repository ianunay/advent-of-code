# Learnings



## 5

1. Creating a Matrix of Y*X

```js
const MAP = Array(Y).fill(Array(X).fill(0));
```
is bad https://stackoverflow.com/a/60226400

use the following instead
```js
const MAP = Array(Y).fill(null).map(()=>Array(X).fill(0))
```

## 6
Think about maximum array lengths and heap sizes

## 7

## 8
Learn to use code editor instead of a notebook

## 9
BFS is easier to write, no recursion is hard

## 10
check your code before running it? not sure if it helps but debugger is definitely helpful

## 11
There are 8 adjacent elements not 6