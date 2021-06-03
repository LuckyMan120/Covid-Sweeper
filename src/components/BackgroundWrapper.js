import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import AppTheme from '../context/ThemeColors';
import '../stylesheets/App.css';

export const BackgroundWrapper = ({ children }) => {
  const { gameParams } = useContext(GlobalContext);
  const { bgMajor, bgMinor } = AppTheme[gameParams.theme ? 'blue' : 'orange'];
  const ColorTheme = {
    background: bgMajor,
    background: `-webkit-linear-gradient(to right, ${bgMinor}, ${bgMajor})`,
    background: `linear-gradient(to right, ${bgMinor}, ${bgMajor})`,
  };

  return (
    <div style={ColorTheme} className='App'>
      {children}
    </div>
  );
};
