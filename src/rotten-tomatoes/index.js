function rottenTomatoes(grid) {
  const goodTomatoesVisited = [];
  const badTomatoesVisited = [];
  let timeTake = 0;
  let rowLength;
  let colLength;
  const numGoodTomatoes = goodTomatoes = grid.flat().filter(location => location === 1).length;
  const numBadTomatoes = goodTomatoes = grid.flat().filter(location => location === 2).length;
  //check if the location has been visited

  if (!numBadTomatoes) {
    return -1
  }
  const searchLocation = (location, searchArray) => {
    const [x, y] = location;
    if (searchArray.length === 0) return false;
    for (let i = 0; i < searchArray.length; i++) {
      let [row, col] = searchArray[i];
      if (x === row && y === col) {
        return true
      }
    }
    return false
  }

  const isPointVisited = (location,) => {
    const [row, col] = location;
    return (grid[row][col] === 1) ? searchLocation(location, goodTomatoesVisited)
      : searchLocation(location, badTomatoesVisited)
  }

  function getAdjacents(position) {
    const [row, column] = position;
    const topAdjacent = row === 0 ? false : [row - 1, column];
    const rightAdjacent = column === colLength ? false : [row, column + 1];
    const bottomAdjacent = row === rowLength ? false : [row + 1, column];
    const leftAdjacent = column === 0 ? false : [row, column - 1]
    return [topAdjacent, rightAdjacent, bottomAdjacent, leftAdjacent]
      .filter(Boolean)
  }

  const calcTimeTaken = (location, maxTimeTake, numBadTomForEachInteration) => {

    if (!location) {
      return Math.round(maxTimeTake / numBadTomForEachInteration)
    }
    const [row, col] = location;
    if (grid[row][col] === 1) {
      goodTomatoesVisited.push(location)
      maxTimeTake++
    } else {
      badTomatoesVisited.push(location)
      numBadTomForEachInteration++
    }

    const initialTime = maxTimeTake;
    const adjacentLocation = getAdjacents(location, grid);

    adjacentLocation.forEach(location => {
      const [row, col] = location;
      if (grid[row][col] !== 0 && !isPointVisited(location)) {
        let timeTaken = calcTimeTaken(location, initialTime, numBadTomForEachInteration)
        maxTimeTake = (maxTimeTake > timeTaken)
          ? maxTimeTake : timeTaken;
      }
    });

    return calcTimeTaken(null, maxTimeTake, numBadTomForEachInteration);

  }

  for (let row = 0; row < grid.length; row++) {
    rowLength = grid.length - 1;
    for (let col = 0; col < grid[row].length; col++) {
      colLength = grid[row].length - 1;
      if (grid[row][col] === 2 && !isPointVisited([row, col], badTomatoesVisited)) {
        timeTake += calcTimeTaken([row, col], 0, 0);
      }
    }
  }

  if (numGoodTomatoes > goodTomatoesVisited.length) {
    return -1
  }

  return timeTake;
}

const grid = [
  [0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 2, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
  [0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [2, 0, 1, 0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0, 1, 0, 1, 0, 2, 0],
];

//console.log(getMinutes(grid))

module.exports = rottenTomatoes;
