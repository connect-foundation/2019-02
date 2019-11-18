import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { GlobalStyle } from './styles';
import { Header } from './components/common';

const App = () => (
  <>
    <GlobalStyle />
    <CssBaseline />
    <Header />
  </>
);

export default App;
