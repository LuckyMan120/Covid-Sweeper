import React, { useContext } from 'react';
import GameContext from '../Game/GameContext';
import AppTheme from '../../context/ThemeColors';

import corona from '../../assets/mines/purple-mine.png';
import foundCorona from '../../assets/mines/red-mine.png';
import flag from '../../assets/flags/red-flag.png';
import './Cell.css';

const Cell = ({ data, theme }) => {
  const gameState = useContext(GameContext);
  const { primary, accent, cellColor } = AppTheme[theme ? 'blue' : 'orange'];

  const {
    rightClickHandler,
    leftClickHandler,
    doubleClickHandler,
    finalCell,
  } = gameState;
  const {
    isMine,
    isFlagged,
    isRevealed,
    isVisible,
    neighborCount,
    x,
    y,
  } = data;

  const generateContent = () => {
    let content = null;
    if (isFlagged) {
      content = (
        <img
          style={{
            width: '1.1rem',
            height: '1.1rem',
          }}
          src={flag}
          alt={'flag'}
        />
      );
    } else if (isMine && isVisible) {
      const mineVersion =
        finalCell.x === x && finalCell.y === y ? foundCorona : corona;
      content = (
        <img
          style={{
            height: '1.6rem',
          }}
          src={mineVersion}
          alt={'mine'}
        />
      );
    } else if (neighborCount > 0) {
      content = <h5 style={{ margin: 'auto' }}>{neighborCount}</h5>;
    }

    return content;
  };

  const generateColor = (num) => {
    switch (num) {
      case 1:
        return '#001f3f';
      case 2:
        return 'darkcyan';
      case 3:
        return 'deepskyblue';
      case 4:
        return 'mediumaquamarine';
      case 5:
        return 'cornflowerblue';
      case 6:
        return 'orchid';
      case 7:
        return 'violet';
      case 8:
        return 'gold';
      default:
        return '#faf2f2';
    }
  };

  const generateStyle = () => {
    // const { isVisible, neighborCount, isFlagged, isRevealed } = props.data;

    if (isFlagged) {
      return { ...coveredStyle, color: 'red', fontSize: '1.8rem' };
    } else if (finalCell.x === x && finalCell.y === y && !gameState.playing) {
      return {
        ...seenCell,
        backgroundColor: 'rgb(242, 171, 163)',
        background: `-webkit-radial-gradient(rgba(248, 9, 69, 0.8), rgba(248, 9, 69, 0.4), ${cellColor})`,
        border: '1px solid rgb(248, 9, 69)',
      };
    } else if (isRevealed) {
      return {
        ...seenCell,
        backgroundColor: cellColor,
      };
    } else if (isVisible && neighborCount > 0) {
      return { ...seenCell, color: generateColor(neighborCount) };
    } else if (isVisible && neighborCount === 0) {
      return emptyCell;
    } else {
      return coveredStyle;
    }
  };

  const dynamicStyling = generateStyle();

  return (
    <div
      style={{ ...cellStyle, ...dynamicStyling }}
      onClick={() => leftClickHandler(x, y)}
      onContextMenu={(e) => rightClickHandler(e, x, y)}
      onDoubleClick={(e) => doubleClickHandler(e, x, y)}
    >
      {generateContent()}
    </div>
  );
};

Cell.propTypes = {};

const cellStyle = {
  width: '1.6rem',
  height: '1.6rem',
  margin: '1px',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
};

const coveredStyle = {
  backgroundColor: '#a4b5bf',
  color: '#a4b5bf',
  borderWidth: '1px',
  borderColor: 'rgb(138, 151, 163)',
  borderStyle: 'outset',
  boxShadow: 'inset 2px 0px 3px 1px red',
  boxShadow: 'inset 0px 2px 3px 1px white',
};

const seenCell = {
  fontSize: '1.2rem',
  border: '1px dotted lightgray',
};

const emptyCell = {
  fontSize: '1.5rem',
  border: '1px dotted rgb(218, 218, 218)',
};

export default Cell;
