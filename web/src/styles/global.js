import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *:focus {outline:none}  
  *, body {
    font-family:'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif';
    line-height: normal;
    word-breaK: keep-all;
  }

  ol, ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: top;
    background-color: transparent;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

`;

export default GlobalStyle;
