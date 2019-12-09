import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { GlobalStyle } from './styles';
import {
  Header,
  Wrapper,
  ErrorModal,
  Auth,
} from './components/common';
import {
  Main,
  Channel,
  MyPage,
  PrivacyPolicy,
} from './pages';

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
            <Auth render={({ user }) => <Channel user={user} />} />
          </Route>
          <Route path="/mypage" exact>
            <MyPage />
          </Route>
          <Route path="/privacy-policy" exact>
            <PrivacyPolicy />
          </Route>
          <Route>
            <ErrorModal message="존재하지 않는 페이지 입니다..." />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  </>
);

export default App;
