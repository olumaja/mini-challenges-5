# Rotten Tomatoes

In a given grid, each cell can have one of three values:

the value `0` representing an empty cell;
the value `1` representing a fresh tomato;
the value `2` representing a rotten tomato.
Every minute, any fresh tomato that is adjacent (4-directionally) to a rotten tomato becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh tomato. If this is impossible, return `-1` instead.

## Example 1

```js
Input: [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
];
```

Output: `4`

### Explanation

![Rotten Tomatoes](./images/tomatoes.png)

## Example 2:

```js
Input: [
  [2, 1, 1],
  [0, 1, 1],
  [1, 0, 1],
];
```

Output: `-1`

### Explanation

The tomato in the bottom left corner (row 2, column 0) is never rotten, because rot only happens 4-directionally.

### Example 3

```js
Input: [[0, 2]];
```

Output: `0`

### Explanation

Since there are already no fresh tomatoes at minute 0, the answer is just `0`.
