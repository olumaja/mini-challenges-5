function rottenTomatoes(grid) {

  //This challenge was solve using breadth first search algorithm
  let rottenTime = 0;
  let tomatoesConverted = 0;
  let visitedArray = [];
  let queueArray = [];
  let totalFresh = 0;
  let rottenLocation = [];
  let arrayAdjacent;
  let adjacentOfOnes;
  let maxColumn = 0;
  let location = [];

  for(let j = 0; j < grid.length; j++){
    maxColumn = grid[j].length;
    for(let k = 0; k < maxColumn; k++){

      if(grid[j][k] === 2){

        rottenLocation.push([j, k]);
        visitedArray.push([j, k]);

      }
      else if(grid[j][k] === 1){totalFresh++}

    }
  }

  if(rottenLocation.length === 0){
    console.log(-1);
    return -1;
  }

  if(totalFresh === 0){
    console.log(0);
    return 0;
  }

  for(let i = 0; i < rottenLocation.length; i++){

    arrayAdjacent = adjacent(grid.length - 1, maxColumn - 1, rottenLocation[i]);
    adjacentOfOnes = allOnes(arrayAdjacent);
    location.push(...notVisited(adjacentOfOnes, visitedArray));
    queueArray.push(...location);
    location = [];
    if(i === rottenLocation.length - 1){
      rottenTime++;
    }

  }

  do{

    do{

      arrayAdjacent = adjacent(grid.length - 1, maxColumn - 1, queueArray[0]);
      adjacentOfOnes = allOnes(arrayAdjacent);
      queueArray.shift();
      location.push(...notVisited(adjacentOfOnes, visitedArray));

   }while(queueArray.length > 0)

   queueArray.push(...location);
   if(queueArray.length !== 0){rottenTime++;}
   location = [];

 }while(queueArray.length > 0)

if(tomatoesConverted < totalFresh){
  console.log(-1);
  return -1;
}
else if(tomatoesConverted === totalFresh){
  console.log(rottenTime);
  return rottenTime;
}

  function adjacent(sizeRow, sizeCol, coordinate){
    const [row, column] = coordinate;
    const topAdjacent = row === 0 ? false : [row - 1, column];
    const rightAdjacent = column === sizeCol ? false : [row, column + 1];
    const bottomAdjacent = row === sizeRow ? false : [row + 1, column];
    const leftAdjacent = column === 0 ? false :  [row, column - 1];

    return [topAdjacent, rightAdjacent, bottomAdjacent, leftAdjacent].filter(Boolean)

  }

  function allOnes(arrayAdjacent){

    return arrayAdjacent.filter(x =>{
      const [row, col] = x;
      return grid[row][col] === 1;
    });

  }

  function notVisited(ones, visitedArray){

    let status = false;
    let holder = [];

    for(let i = 0; i < ones.length; i++){

      let [adjacentRow, adjacentColumn] = ones[i];
      for(let j = 0; j < visitedArray.length; j++){
        let [visitedRow, visitedColumn] = visitedArray[j];
        if(visitedRow === adjacentRow && visitedColumn === adjacentColumn){
          status = false;
          break;
        }
        else if(visitedRow !== adjacentRow || visitedColumn !== adjacentColumn){status = true;}

      }

      if(status){
        visitedArray.push([adjacentRow, adjacentColumn]);

        holder.push([adjacentRow, adjacentColumn]);
        tomatoesConverted++;
      }

    }

    return holder;

  }

}

module.exports = rottenTomatoes;
