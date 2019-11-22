import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    default: '#f8f9fa',
    common: {
      white: '#fff',
      black: '#000',
    },
    primary: {
      contrastText: '#fff',
      main: '#e67700',
      light: '#343a40',
    },
    background: {
      light: '#fff9db',
      main: '#fff3bf',
    },
    naver: '#2db400',
    kakao: '#fee102',
    google: '#fff',
    dropyGray: {
      0: '#f8f9fa',
      1: '#f1f3f5',
      2: '#e9ecef',
      3: '#dee2e6',
      4: '#ced4da',
      5: '#adb5bd',
      6: '#868e96',
      7: '#495057',
      8: '#343a40',
      9: '#212529',
    },
    dropyYellow: {
      0: '#fff9db',
      1: '#fff3bf',
      2: '#ffec99',
      3: '#ffe066',
      4: '#ffd43b',
      5: '#fcc419',
      6: '#fab005',
      7: '#f59f00',
      8: '#f08c00',
      9: '#e67700',
    },
    shadow: {
      button: 'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px',
      channelButton: '0px 2px 19px rgba(230, 119, 0, 0.4)',
    },
  },
  typography: {
    pxToRem: (value) => `${value / 16}rem`,
    fontFamily: [
      'Spoqa Han Sans', 'Spoqa Han Sans JP', 'Sans-serif',
    ].join(','),
    h1: {
      color: '#e67700',
      fontSize: '1.3rem',
      fontWeight: 700,
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        'background-color': '#f8f9fa',
        'border-bottom': '1px solid #dee2e6',
      },
    },
  },
});
