import React, { useState, useContext } from 'react';
import {
  Button,
  Input,
  Label,
  FormGroup,
  UncontrolledTooltip,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';
import { faViruses, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import history from '../history';
import { GlobalContext } from '../context/GlobalState';
import AppTheme from '../context/ThemeColors';
import '../stylesheets/Landing.css';

const Landing = () => {
  const [difficulty, setDifficulty] = useState('Beginner');
  const [mines, setMines] = useState(10);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const { gameParams, setGameParams } = useContext(GlobalContext);

  const themeColor = gameParams.theme ? 'blue' : 'orange';
  const { primary, accent } = AppTheme[themeColor];
  const createSelectItems = (min, max) => {
    let items = [];
    for (let i = min; i <= max; i++) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return items;
  };

  const changeDifficulty = (e) => {
    setDifficulty(e.target.value);

    switch (e.target.value) {
      case 'Beginner':
        setHeight(10);
        setWidth(10);
        setMines(10);
        break;

      case 'Novice':
        setHeight(12);
        setWidth(12);
        setMines(22);
        break;

      case 'Intermediate':
        setHeight(12);
        setWidth(18);
        setMines(44);
        break;

      case 'Advanced':
        setHeight(15);
        setWidth(18);
        setMines(70);
        break;

      case 'Expert':
        setHeight(17);
        setWidth(30);
        setMines(155);
        break;

      case 'Master':
        setHeight(17);
        setWidth(40);
        setMines(275);
        break;
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setGameParams({ height, width, mines });
    history.push(`/play`);
  };

  return (
    <div className='mainContainer' style={Styling}>
      <div style={TitleContainer}>
        <FontAwesomeIcon
          icon={faViruses}
          className='virus-icon far fa-2x fa-in'
        />

        <h2>Covid Sweeper</h2>
      </div>
      <div style={FormContainer}>
        <form
          onSubmit={onSubmitHandler}
          style={{ ...Form, border: `1px double ${accent}` }}
        >
          <FormGroup style={InputRow}>
            <Label for='difficulty' sm={2} style={LabelStyle}>
              Difficulty:
            </Label>
            <Input
              style={InputStyle}
              type='select'
              name='difficulty'
              id='difficulty'
              onChange={changeDifficulty}
            >
              <option>Beginner</option>
              <option>Novice</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
              <option>Master</option>
              <option>Custom</option>
            </Input>
          </FormGroup>

          <FormGroup style={InputRow}>
            <Label for='height' sm={2} style={LabelStyle}>
              Height:
            </Label>
            <Input
              style={InputStyle}
              type='select'
              name='setHeight'
              id='height'
              disabled={!(difficulty === 'Custom')}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
            >
              {createSelectItems(5, 20)}
            </Input>
          </FormGroup>

          <FormGroup style={InputRow}>
            <Label for='width' sm={2} style={LabelStyle}>
              Width:
            </Label>
            <Input
              style={InputStyle}
              type='select'
              name='width'
              id='width'
              value={width}
              disabled={!(difficulty === 'Custom')}
              onChange={(e) => setWidth(Number(e.target.value))}
            >
              {createSelectItems(5, 40)}
            </Input>
          </FormGroup>

          <FormGroup style={InputRow}>
            <Label for='mines' sm={2} style={LabelStyle}>
              Mines:
            </Label>
            <Input
              style={InputStyle}
              type='select'
              name='mines'
              id='mines'
              value={mines}
              disabled={!(difficulty === 'Custom')}
              onChange={(e) => setMines(Number(e.target.value))}
            >
              {createSelectItems(10, width * height * 0.6)}
            </Input>
          </FormGroup>

          <Button
            style={{
              ...ButtonStyle,
              backgroundColor: primary,
              border: `1px solid ${accent}`,
              color: accent,
            }}
          >
            Play Now!
          </Button>
        </form>
      </div>
      <div style={FooterContainer} className='footer'>
        <div style={Footer} className='content'>
          <FontAwesomeIcon
            icon={faListAlt}
            style={{ stroke: accent }}
            className={`icon far fa-2x fa-in`}
            id='scoreboard'
            aria-label='scoreboard'
            onClick={() => history.push(`/scores`)}
          />
          <UncontrolledTooltip
            style={tooltip}
            placement='bottom'
            target='scoreboard'
          >
            Scoreboard
          </UncontrolledTooltip>

          {/* <a href={'/scores'} id='information'>
            <FontAwesomeIcon
              icon={faQuestionCircle}
              className='icon far fa-2x fa-in'
            />
            <UncontrolledTooltip
              style={tooltip}
              placement='bottom'
              target='information'
            >
              Info
            </UncontrolledTooltip>
          </a> */}

          <FontAwesomeIcon
            icon={faUserCog}
            style={{ fontSize: '1.75rem', stroke: accent }}
            className={`icon far fa-lg fa-in ${themeColor}`}
            id='settings'
            aria-label='settings'
            onClick={() => history.push(`/settings`)}
          />
          <UncontrolledTooltip
            style={tooltip}
            placement='bottom'
            target='settings'
          >
            Settings
          </UncontrolledTooltip>

          <a
            href={'https://github.com/T-mclennan/minesweeper-react'}
            id='github'
            aria-label='github'
          >
            <FontAwesomeIcon
              icon={faGithubAlt}
              style={{ fontSize: '2.2rem', stroke: accent }}
              className={`icon far fa-2x fa-in ${themeColor}`}
            />
          </a>
          <UncontrolledTooltip
            style={tooltip}
            placement='bottom'
            target='github'
          >
            Github
          </UncontrolledTooltip>
          {/* <i className='far fa-question-circle'></i> */}
        </div>
      </div>
    </div>
  );
};

const Flex = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
};

const Styling = {
  ...Flex,
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
};

const TitleContainer = {
  ...Flex,
  flexDirection: 'row',
  paddingRight: '3rem',
};

const FormContainer = {
  ...Flex,
  flexDirection: 'column',
};

const Form = {
  ...Flex,
  flexDirection: 'column',
  width: '30rem',
  borderRadius: '1rem',
  padding: '2rem',
  margin: 'auto',
};

const InputStyle = {
  textAlignLast: 'center',
  color: '#0e1a49',
  fontSize: '1rem',
  height: '2.5rem',
  width: '15rem',
  border: '1px solid #0e1a49',
  borderRadius: '1rem',
  marginLeft: '2rem',
};

const InputRow = {
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  width: '36.5rem',
  padding: '0 1rem',
};

const ButtonStyle = {
  fontSize: '1rem',
  height: '3.2rem',
  width: '22rem',
  fontWeight: 'bold',
  borderRadius: '1rem',
  margin: 'auto',
  marginTop: '0.5rem',
};

const FooterContainer = {
  ...Flex,
  height: '5rem',
  width: '100%',
};

const LabelStyle = {
  fontSize: '1.3rem',
  paddingTop: '3px',
};

const tooltip = {
  backgroundColor: 'transparent',
  color: '#d41b53',
  fontSize: '1.2rem',
};

const Footer = {
  ...Flex,
  // width: '24rem',
  width: '20rem',
};

export default Landing;
