function rottenTomatoes(grid) {
  let numberOfMinutes = 0;

  // Helper function to check adjacent elements
  // Turn twos to zeros and ones to twos
  // Keep track of number of minutes
  function checkAdjacent(grid, numberOfMinutes) {
    let queue = [];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col] === 2) {
          queue.push([row, col]);
          grid[row][col] = 0;
        }
      }
    }
    while (queue.length) {
      let [nodeX, nodeY] = queue.shift();
      if (nodeX - 1 >= 0 && grid[nodeX - 1][nodeY] === 1) {
        grid[nodeX - 1][nodeY] = 2;
      }
      if (nodeY - 1 >= 0 && grid[nodeX][nodeY - 1] === 1) {
        grid[nodeX][nodeY - 1] = 2;
      }
      if (nodeX + 1 < grid.length && grid[nodeX + 1][nodeY] === 1) {
        grid[nodeX + 1][nodeY] = 2;
      }
      if (nodeY + 1 < grid[0].length && grid[nodeX][nodeY + 1] === 1) {
        grid[nodeX][nodeY + 1] = 2;
      }
    }
    numberOfMinutes++;
    return numberOfMinutes;
  }

  // Checks that rotten tomatoes remain
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 2) {
        checkAdjacent(grid, numberOfMinutes++);
        row = 0;
        col = -1;
      }
    }
  }

  // If fresh tomato remains untouched
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 1) {
        return -1;
      }
    }
  }
  return numberOfMinutes - 1;
}

module.exports = rottenTomatoes;
