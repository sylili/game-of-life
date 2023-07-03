import { to1DArray, to2DArray } from "./helper";

export const getNextState = (board, columns) => {
  const table = to2DArray([...board], columns);
  let nextState = to2DArray([...board], columns);

  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[0].length; j++) {
      const cell = table[i][j];
      const numOfAliveNeighbours = countAliveNeighbours(table, i, j);

      if (cell) {
        if (numOfAliveNeighbours < 2 || numOfAliveNeighbours > 3) {
          nextState[i][j] = !table[i][j];
        }
      } else {
        if (numOfAliveNeighbours === 3) {
          nextState[i][j] = !table[i][j];
        }
      }
    }
  }

  nextState = to1DArray(nextState);
  return nextState;
};

const countAliveNeighbours = (table, i, j) => {
  let aliveCount = 0;
  const rowLimit = table.length - 1;
  const columnLimit = table[0].length - 1;

  for (let x = Math.max(0, i - 1); x <= Math.min(i + 1, rowLimit); x++) {
    for (let y = Math.max(0, j - 1); y <= Math.min(j + 1, columnLimit); y++) {
      if (x !== i || y !== j) {
        if (table[x][y]) {
          aliveCount++;
        }
      }
    }
  }

  return aliveCount;
};
