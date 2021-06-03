export const checkWin = (board) => {
  let win = true;
  board.forEach((row) => {
    row.forEach((cell) => {
      if (
        (!cell.isVisible && !cell.isFlagged) ||
        (!cell.isFlagged && cell.isMine)
      ) {
        win = false;
      }
    });
  });
  return win;
};

export const generateScore = (elapsed, width, height, mines) => {
  // console.log(`width: ${width} height: ${height} mines: ${mines}`);
  const mineCoefficient = mines / (width * height);
  const sizeCoefficient = mines * 12;
  const timeCoefficient =
    (2600 * (1 + mineCoefficient) + sizeCoefficient) / 1000;
  const baseScore = 1200 * (1 + mineCoefficient * 6);
  const elapsedTime = elapsed / (1000 * mines);

  const modifier =
    timeCoefficient > elapsedTime ? timeCoefficient - elapsedTime : 1;
  const score = baseScore * modifier;
  // console.log(timeCoefficient * mines);
  // console.log(elapsedTime);

  console.log(
    `modifier: ${modifier} mineCoeff: ${mineCoefficient} timeCoefficient: ${timeCoefficient} baseScore: ${baseScore} score: ${score}`
  );
  return Math.floor(score);
};
