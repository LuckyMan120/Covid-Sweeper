import React, { useContext } from 'react';
import { tada } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import Cell from '../Cell/Cell';
import { GlobalContext } from '../../context/GlobalState';

const Board = ({ board, over }) => {
  const { gameParams } = useContext(GlobalContext);
  const animationStyle =
    over && gameParams.animation
      ? {
          animation: 'x 0.3s',
          animationName: Radium.keyframes(tada, 'tada'),
          borderColor: 'rgba(128,0,128, 0.6aw)',
          boxShadow: 'inset 0px 0px 0px 4px rgba(128,0,128, 0.2)',
        }
      : {};

  return (
    <StyleRoot>
      <div
        className='game-board'
        style={{
          ...boardStyle,
          ...noRightClick,
          ...animationStyle,
        }}
      >
        <div style={colStyle}>
          {board.map((row, i) => {
            return (
              <div key={i} style={rowStyle}>
                {row.map((item) => {
                  return (
                    <Cell
                      key={item.x * row.length + item.y}
                      data={item}
                      theme={gameParams.theme}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </StyleRoot>
  );
};

const rowStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flexGrow: '1',
};

const colStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
};

const boardStyle = {
  display: 'inline-block',
  padding: '1rem',
  borderRadius: '1rem',
  backgroundColor: '#faf2f2',
  maxWidth: '100rem',
  borderWidth: '2px',
  borderColor: 'lightgray',
  borderStyle: 'double',
  transition: '0.7s all ease-in',
};

const noRightClick = {
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  MsUserSelect: 'none',
  OUserSelect: 'none',
  UserSelect: 'none',
};

export default Board;
