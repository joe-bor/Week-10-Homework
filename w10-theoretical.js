// Write a function that accepts an integer N
// and returns a NxN spiral matrix.
// --- Examples
//   matrix(2)
//     [[undefined, undefined],
//     [undefined, undefined]]
//   matrix(3)
//     [[1, 2, 3],
//     [8, 9, 4],
//     [7, 6, 5]]
//  matrix(4)
//     [[1,   2,  3, 4],
//     [12, 13, 14, 5],
//     [11, 16, 15, 6],
//     [10,  9,  8, 7]]

function createSpiralMatrix(num) {
  //outer index (row)
  let i = 0;

  //inner index (col)
  let j = 0;

  //Create an array that has length = num
  let matrix = Array(num);

  //Each elem of the above array is another array with length = num
  //fill inner array with 0
  for (let i = 0; i < num; i++) {
    matrix[i] = Array(num).fill(0);
  }

  //handling num === 2
  if (num < 3) {
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num; j++) {
        matrix[i][j] = undefined;
      }
    }
    return matrix;
  }

  //this is to adjust the value of the indices of the matrix
  const directions = {
    right: [0, 1],
    down: [1, 0],
    left: [0, -1],
    up: [-1, 0],
  };

  let direction = ["right", "down", "left", "up"];
  let directionIdx = 0;

  for (let k = 1; k <= num * num; k++) {
    //set value to current matrix location
    matrix[i][j] = k;

    //adjust location w/ current direction[]
    // to check if adjacent element is 0
    let currDir = direction[directionIdx % 4];

    // 'placeholder' indices, to check adjacent values
    let newI = i + directions[currDir][0];
    let newJ = j + directions[currDir][1];

    //if adjacent elem at curr direction is not 0 or is invalid, change direction
    if (
      newI === num ||
      newI < 0 ||
      newJ === num ||
      newJ < 0 ||
      matrix[newI][newJ] !== 0
    ) {
      directionIdx++;
      currDir = direction[directionIdx % 4];
    }

    //then set new values for matrix indices
    i = i + directions[currDir][0];
    j = j + directions[currDir][1];
  }

  return matrix;
}

console.log(createSpiralMatrix(2));
