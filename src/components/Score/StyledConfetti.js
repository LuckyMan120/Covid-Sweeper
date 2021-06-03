import React, { useContext } from 'react';
import Confetti from 'react-dom-confetti';
import { GlobalContext } from '../../context/GlobalState';
import AppTheme from '../../context/ThemeColors';

const StyledConfetti = ({ status }) => {
  const { gameParams } = useContext(GlobalContext);
  const { bgMajor, bgMinor, primary, accent, cellColor } = AppTheme[
    gameParams.theme ? 'blue' : 'orange'
  ];

  const confettiConfig = {
    angle: 45,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 1,
    width: '8px',
    height: '8px',
    perspective: '800px',
    colors: [bgMajor, bgMinor, primary, accent, cellColor, '#d41b53'],
  };

  return <Confetti active={status} config={confettiConfig} />;
};

export default StyledConfetti;
