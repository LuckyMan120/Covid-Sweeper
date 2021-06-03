import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'reactstrap';
import CountUp from 'react-countup';
import history from '../history';
import { GlobalContext } from '../context/GlobalState';
import AppTheme from '../context/ThemeColors';

import { getScores, cleanScores } from '../actions/scoring';
import '../stylesheets/Scoreboard.css';

const Scoreboard = () => {
  const [scores, setScores] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { gameParams } = useContext(GlobalContext);

  const { primary, accent } = AppTheme[gameParams.theme ? 'blue' : 'orange'];

  useEffect(() => {
    async function onLoad() {
      setLoading(true);
      try {
        const scores = await getScores();
        const newScores = cleanScores(scores);
        setScores(newScores);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    onLoad();
  }, []);

  const renderResultRows = (data) => {
    return data.map((player, index) => {
      index++;
      const countTime = parseFloat(player.score) / 1200;
      return (
        <tr key={index}>
          <th scope='row'>{index}</th>
          <td>{player.username}</td>
          <td>
            <CountUp
              start={0}
              end={player.score}
              duration={countTime}
              separator={','}
            />
          </td>
        </tr>
      );
    });
  };

  const handleClick = () => {
    history.push('/');
  };

  return !isLoading ? (
    <div className='standings-page' onClick={() => handleClick()}>
      <h2 className='header'>Top Players:</h2>
      <div style={{ ...outerScoreContainer, border: `1px double ${accent}` }}>
        <div style={innerScoreContainer}>
          <Table
            className='standings'
            style={tableStyle}
            size='sm'
            responsive
            striped
          >
            <thead>
              <tr>
                <th style={{ width: '3rem' }}>#</th>
                <th style={{ width: '17rem' }}>Username</th>
                <th style={{ width: '17rem' }}>Score</th>
              </tr>
            </thead>
            <tbody>{scores.length > 0 ? renderResultRows(scores) : ''}</tbody>
          </Table>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
};

const outerScoreContainer = {
  height: '85%',
  padding: '2rem',
  borderRadius: '2rem',
  margin: 'auto',
  marginTop: '1rem',
};

const innerScoreContainer = {
  borderRadius: '2rem',
  border: '2rem solid rgba(245,245,245, 0.8)',
  borderTop: '0px',
};

const tableStyle = {
  height: '85%',
  borderRadius: '2rem',
  padding: '2rem',
  color: '#0e1a49',
  margin: '0px',
};

export default Scoreboard;
