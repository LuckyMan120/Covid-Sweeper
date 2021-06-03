import React from 'react';
import PropTypes from 'prop-types';
import Clock from '../Clock/Clock';
import { Button } from 'reactstrap';
import './InfoBar.css';
import history from '../../history';

const infoBar = (props) => {
  return (
    <div style={barStyle}>
      <div style={statusContainer}>
        <h5 className='game-status'>{props.status}</h5>
      </div>
      <div style={ButtonContainer}>
        <Button
          className='red'
          variant='outlined'
          style={props.playing ? outlineButton : HomeButton}
          onClick={() => {
            history.push('/');
          }}
        >
          Main Menu
        </Button>
        <Button
          className='blue'
          variant='outlined'
          style={props.playing ? outlineButton : ReplayButton}
          onClick={() => {
            props.resetGame();
          }}
        >
          {props.playing ? 'Restart' : 'Play Again?'}
        </Button>
      </div>
      <div style={clockContainer}>
        <Clock playing={props.playing} updateTime={props.updateTime} />
      </div>
    </div>
  );
};

const barStyle = {
  padding: '0.3rem',
  display: 'flex',
  color: '#0e2754',
  flexDirection: 'row',
  alignContent: 'center',
  backgroundColor: 'rgba(14,26,73,0.3)',
  border: '1px solid rgba(14,26,73,0.5)',
};

const container = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
};

const statusContainer = {
  ...container,
  flex: 5,
};

const ButtonContainer = {
  ...container,
  flex: 4,
};

const clockContainer = {
  ...container,
  flex: 3,
};

const ButtonStyle = {
  color: 'white',
  fontSize: '1rem',
  height: '3.2rem',
  width: '10.5rem',
  fontWeight: 'bold',
  borderColor: 'white',
  borderRadius: '1rem',
  margin: '0.5rem',
};

const outlineButton = { ...ButtonStyle, backgroundColor: 'transparent' };

const HomeButton = {
  ...ButtonStyle,
  backgroundColor: 'rgba(255, 0, 0, 0.4)',
};

const ReplayButton = {
  ...ButtonStyle,
  backgroundColor: 'rgba(0,191,255, 0.4)',
};

infoBar.propTypes = {};

export default infoBar;
