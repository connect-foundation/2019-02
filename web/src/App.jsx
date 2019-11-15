import React from 'react';
import { CssBaseline } from '@material-ui/core';
import GlobalStyle from './styles/global';
import Header from './components/common/Header';

const App = () => (
  <>
    <GlobalStyle />
    <CssBaseline />
    <Header />
  </>
);

export default App;
