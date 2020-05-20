function rottenTomatoes(grid) {
    let gridCopy = grid

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

    while (!completed) {

      gridCopy.forEach((element, rowI) => {
          element.forEach((item, colI) => {

              if (item == 2) {

                  dimensions.forEach(position => {

                      row = rowI + position[0];
                      col = colI + position[1];

                    if (!(row < 0) && !(col < 0) && !(row >= gridCopy.length) && !(col >= gridCopy[0].length)) {
                      if (gridCopy[row][col] == 1) {
                        queue.push([row, col])
                      }
                    }

                  })
              }
          })
      });

        if (queue.length == 0) {
            completed = true
        } else {
            steps++
            queue.forEach(item => gridCopy[item[0]][item[1]] = 2);
        }
        queue = []

    }

    gridCopy.forEach(element => {
        element.forEach(item => {
            if(item == 1) steps = -1
        })
    })

    return steps
}

module.exports = rottenTomatoes;
