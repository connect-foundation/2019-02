import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import theme from './styles/theme';
import App from './App';
import client from './graphql';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('app'),
);
