import React from 'react';
import Game from './components/Game/Game';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import history from './history';
import Landing from './pages/Landing';
import Scoreboard from './pages/Scoreboard';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { BackgroundWrapper } from './components/BackgroundWrapper';
import { GlobalProvider, GlobalContext } from './context/GlobalState';
import { isMobile } from 'react-device-detect';

function App() {
  return (
    <GlobalProvider>
      <BackgroundWrapper>
        <Router history={history}>
          {isMobile ? history.push('/Wrong-Device') : ''}
          <Switch>
            <Route exact path='/'>
              <Landing />
            </Route>

            <Route exact path='/play'>
              <GlobalContext.Consumer>
                {({ gameParams }) => <Game gameParams={gameParams} />}
              </GlobalContext.Consumer>
            </Route>

            <Route exact path='/scores'>
              <Scoreboard />
            </Route>

            <Route exact path='/settings'>
              <Settings />
            </Route>

            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </BackgroundWrapper>
    </GlobalProvider>
  );
}

export default App;
