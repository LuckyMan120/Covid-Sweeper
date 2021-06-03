import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  gameParams: {
    width: 10,
    height: 10,
    mines: 10,
    isSfx: true,
    animation: true,
    theme: false,
  },
};

//Create context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions:
  function setGameParams(params) {
    console.log('inside SetGameParams');
    console.log(params);

    dispatch({
      type: 'SET_GAME_PARAMS',
      payload: params,
    });
  }

  function toggleSound() {
    dispatch({
      type: 'TOGGLE_SOUND',
    });
  }

  function toggleTheme() {
    dispatch({
      type: 'TOGGLE_THEME',
    });
  }

  function toggleAnimation() {
    dispatch({
      type: 'TOGGLE_ANIMATION',
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        gameParams: state.gameParams,
        setGameParams,
        toggleSound,
        toggleTheme,
        toggleAnimation,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
