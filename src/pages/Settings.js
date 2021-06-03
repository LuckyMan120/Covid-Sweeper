import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import Switch from 'react-switch';
import { GlobalContext } from '../context/GlobalState';
import AppTheme from '../context/ThemeColors';
import history from '../history';

import '../stylesheets/Scoreboard.css';

const Settings = () => {
  const { gameParams, toggleTheme, toggleSound, toggleAnimation } = useContext(
    GlobalContext
  );

  const { animation, isSfx, theme } = gameParams;
  const { primary, accent } = AppTheme[gameParams.theme ? 'blue' : 'orange'];

  const handleClick = () => {
    history.push('/');
  };

  return (
    <div className='standings-page'>
      <h2 className='header'>Settings:</h2>
      <div style={{ ...outerContainer, border: `1px double ${accent}` }}>
        <div style={innerContainer}>
          <div style={switchRow}>
            <Switch
              height={29}
              id='animation'
              checked={animation}
              onChange={toggleAnimation}
              onColor={primary}
              checkedIcon={false}
            />
            <h5 style={label}>Animations</h5>
          </div>
          <div style={switchRow}>
            <Switch
              height={29}
              id='sfx'
              checked={isSfx}
              onColor={primary}
              checkedIcon={false}
              onChange={toggleSound}
            />
            <h5 style={label}>Game Sound Effects</h5>
          </div>
          <div style={switchRow}>
            <Switch
              height={29}
              id='theme'
              checked={theme}
              onColor={'#0099FF'}
              offColor={'#FF946C'}
              checkedIcon={false}
              uncheckedIcon={false}
              onChange={toggleTheme}
            />
            <h5 style={label}>Game Color Palette</h5>
          </div>
          <div style={buttonRow}>
            <Button
              style={{
                ...buttonStyle,
                backgroundColor: primary,
                border: `1px solid ${accent}`,
              }}
              onClick={handleClick}
            >
              Main Menu
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const outerContainer = {
  height: '85%',
  padding: '2rem',
  borderRadius: '2rem',
  margin: 'auto',
  marginTop: '1rem',
};

const buttonRow = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
};

const switchRow = {
  width: '100%',
  marginLeft: '1rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignContent: 'center',
};

const innerContainer = {
  borderRadius: '1.5rem',
  backgroundColor: 'rgba(245,245,245, 0.8)',
  borderTop: '0px',
  width: '30rem',
  height: '20rem',
  padding: '2rem 4rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
};

const label = {
  fontSize: '1.6rem',
  marginLeft: '2rem',
  color: '#0e1a49',
};

const buttonStyle = {
  height: '3.2rem',
  width: '22rem',
  fontWeight: 'bold',
  borderRadius: '1rem',
  margin: 'auto',
  marginTop: '0.5rem',
};

export default Settings;
