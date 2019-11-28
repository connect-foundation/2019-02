import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { GlobalStyle } from './styles';
import { Header, Wrapper } from './components/common';
import { Main, Channel, MyPage } from './pages';

const App = () => (
  <>
    <GlobalStyle />
    <CssBaseline />
    <Wrapper>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/channels/:channelId" exact>
            <Channel />
          </Route>
          <Route path="/mypage" exact>
            <MyPage />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  </>
);

export default App;
