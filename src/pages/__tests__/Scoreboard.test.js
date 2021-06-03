import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom/extend-expect';
import Scoreboard from '../Scoreboard';


function setup() {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
}

describe('Scoreboard', () => {
  test('"How it works" scoreboard shows highscore list', () => {
    setup()

   
  });
});
