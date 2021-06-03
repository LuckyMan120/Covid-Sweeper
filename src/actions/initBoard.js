const generateBoard = (height, width) => {
  let board = [];
  for (let j = 0; j < height; j++) {
    board.push([]);
    for (let i = 0; i < width; i++) {
      board[j][i] = {
        x: i,
        y: j,
        isMine: false,
        isFlagged: false,
        isVisible: false,
        isRevealed: false,
        neighborCount: 0,
      };
    }
  }
  return board;
};

const generateMines = (board, height, width, totalMines) => {
  let x,
    y,
    mineCount = 0;
  while (mineCount < totalMines) {
    x = Math.floor(Math.random() * width);
    y = Math.floor(Math.random() * height);
    if (!board[y][x].isMine) {
      board[y][x].isMine = true;
      mineCount++;
    }
  }
  return board;
};

const checkNeighbors = (board, height, width) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      //if cell is mine, tally all surrounding neighbors:
      if (board[y][x].isMine) {
        // top:
        if (y > 0) {
          board[y - 1][x].neighborCount++;

          // top left:
          if (x > 0) {
            board[y - 1][x - 1].neighborCount++;
          }

          //top right:
          if (x + 1 < width) {
            board[y - 1][x + 1].neighborCount++;
          }
        }

        //bottom:
        if (y + 1 < height) {
          board[y + 1][x].neighborCount++;

          // bottom left:
          if (x > 0) {
            board[y + 1][x - 1].neighborCount++;
          }

          //bottom right:
          if (x + 1 < width) {
            board[y + 1][x + 1].neighborCount++;
          }
        }

        // left:
        if (x > 0) {
          board[y][x - 1].neighborCount++;
        }

        //right:
        if (x + 1 < width) {
          board[y][x + 1].neighborCount++;
        }
      }
    }
  }
  return board;
};

const getNeighbors = (board, x, y) => {
  const neighbors = [];
  const height = board.length;
  const width = board[0].length;
  // top:
  if (y > 0) {
    neighbors.push(board[y - 1][x]);

    // top left:
    if (x > 0) {
      neighbors.push(board[y - 1][x - 1]);
    }

    //top right:
    if (x + 1 < width) {
      neighbors.push(board[y - 1][x + 1]);
    }
  }

  //bottom:
  if (y + 1 < height) {
    neighbors.push(board[y + 1][x]);

    // bottom left:
    if (x > 0) {
      neighbors.push(board[y + 1][x - 1]);
    }

    //bottom right:
    if (x + 1 < width) {
      neighbors.push(board[y + 1][x + 1]);
    }
  }

  // left:
  if (x > 0) {
    neighbors.push(board[y][x - 1]);
  }

  //right:
  if (x + 1 < width) {
    neighbors.push(board[y][x + 1]);
  }

  return neighbors;
};

export const extraBoardClear = (board, x, y) => {
  let updatedBoard = board;
  const neighbors = getNeighbors(updatedBoard, x, y);
  const flaggedNeighbors = neighbors.filter((cell) => {
    return cell.isFlagged;
  });

  const coveredNeighbors = neighbors.filter((cell) => {
    return !cell.isVisible && !cell.isFlagged;
  });

  if (flaggedNeighbors.length === board[y][x].neighborCount) {
    coveredNeighbors.forEach((cell) => {
      console.log(cell);
      updatedBoard = revealCells(updatedBoard, cell.x, cell.y);
    });
  }
  return updatedBoard;
};

export const showBoard = (board) => {
  let updatedBoard = board;
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[0].length; x++) {
      if (!board[y][x].isFlagged && !board[y][x].isVisible) {
        board[y][x].isVisible = true;
        board[y][x].isRevealed = true;
      }
    }
  }
  return updatedBoard;
};

export const revealCells = (board, x, y) => {
  let updatedBoard = board;
  updatedBoard[y][x].isVisible = true;
  const checkCell = (x, y) => {
    const neighbors = getNeighbors(updatedBoard, x, y);
    neighbors.forEach((cell) => {
      if (!cell.isFlagged && !cell.isVisible && !cell.isMine) {
        updatedBoard[cell.y][cell.x].isVisible = true;
        if (cell.neighborCount === 0) {
          checkCell(cell.x, cell.y);
        }
      }
    });
  };
  checkCell(x, y);
  return updatedBoard;
};

export const initBoard = (height, width, mineCount) => {
  let board = generateBoard(height, width);
  board = generateMines(board, height, width, mineCount);
  board = checkNeighbors(board, height, width);

  return board;
};
