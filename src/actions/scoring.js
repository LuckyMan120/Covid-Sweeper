import { API } from 'aws-amplify';

export const getScores = () => {
  return API.get('scores', '/scores');
};

export const addScore = (data) => {
  console.log(data);
  return API.post('scores', '/scores', {
    body: data,
  });
};

//cleanScores serves to process the score data. Returns sorted list of <10 scores:
//input: array of game objects
//output: array of game objects

export const cleanScores = (data) => {
  const totalScores = data.sort(function (a, b) {
    return b.score - a.score;
  });
  if (totalScores.length > 9) {
    return totalScores.slice(0, 10);
  }
  return totalScores;
};
