import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { GlobalStyle } from './styles';
import { ErrorModal, Auth } from './components/common';
import { Layout } from './components/base';
import { NOT_FOUND } from './constants';
import {
  Main,
  Channel,
  MyPage,
  PrivacyPolicy,
  Login,
} from './pages';

const App = () => (
  <>
    <GlobalStyle />
    <CssBaseline />
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route
            exact
            path="/channels/:channelId"
            component={() => <Auth render={({ user }) => <Channel user={user} />} />}
          />
          <Route exact path="/mypage" component={MyPage} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route component={() => <ErrorModal message={NOT_FOUND} />} />
        </Switch>
      </Layout>
    </Router>
  </>
);

export default App;
