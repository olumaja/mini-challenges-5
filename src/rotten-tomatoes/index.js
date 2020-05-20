function rottenTomatoes(grid) {
    let gridCopy = grid

  // An array that holds added values to the four adjecent nodes
  // top, bottom, left and right respectively.
    const dimensions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
    ];

    let row = 0;
    let col = 0;
    let completed = false;
    let queue = [];
    let steps = 0;

  // A while loop that keeps running-
  // so far as there are still possible adjacent fresh tomato
    while (!completed) {

      // Looping through the grid, seacrching for rotten tomatos-
      // that has adjacent fresh tomatoes
      gridCopy.forEach((element, rowI) => {
          element.forEach((item, colI) => {

            // If the present tomato is rotten,
            // it checks to see if it'll find adjacent fresh tomato
            // and pushes its postion into the queue
              if (item == 2) {

                  dimensions.forEach(position => {

                      row = rowI + position[0];
                      col = colI + position[1];

                    // Avoiding undefind values(out of boundry positions)
                    if (!(row < 0) && !(col < 0) &&
                      !(row >= gridCopy.length) &&
                      !(col >= gridCopy[0].length)) {

                      // If the tomato at the current position is fresh,
                      // its position is then pushed into the queue
                      if (gridCopy[row][col] == 1) {
                        queue.push([row, col])
                      }
                    }

                  })
              }
          })
      });

      // Checks if queue is empty; meaninig that no other adjacent fresh tomato was found
        if (queue.length == 0) {
            completed = true
        } else {
          // If the quene is not empty, then there are still more possible fresh tomatos
          steps++
          // Then they're made to rot one after another
          queue.forEach(item => gridCopy[item[0]][item[1]] = 2);
        }
        queue = []

    }

  // When the while loop completes its search for adjacent fresh tomatos
  // the grid is looped again to check if there are still any fresh tomato(1) remainig
  // if it finds one, it sets the value of steps to -1
    gridCopy.forEach(element => {
        element.forEach(item => {
            if(item == 1) steps = -1
        })
    })

    return steps
}

module.exports = rottenTomatoes;
