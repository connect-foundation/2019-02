import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { GlobalStyle } from './styles';
import { Header, Wrapper } from './components/common';
import { Main } from './pages';

const App = () => (
  <>
    <GlobalStyle />
    <CssBaseline />
    <Wrapper>
      <Header />
      <Router>
        <Switch>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  </>
);

export default App;
