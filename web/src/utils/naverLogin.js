import * as React from 'react';
import PropTypes from 'prop-types';

const NAVER_ID_SDK_URL = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js';

const initLoginButton = (props) => {
  if (!('browser' in process)) {
    return;
  }
  const {
    clientId, callbackUrl, onSuccess, onFailure,
  } = props;
  const { naver } = window;

  const naverLogin = new naver.LoginWithNaverId(
    {
      callbackUrl,
      clientId,
      isPopup: true,
      callbackHandle: true,
      loginButton: { color: 'green', type: 3, height: 60 },
    },
  );

  naverLogin.init();

  if (!window.opener) {
    naver.successCallback = (data) => onSuccess(data);
    naver.failureCallback = onFailure;
  } else {
    naverLogin.getLoginStatus((status) => {
      if (status) {
        window.opener.naver.successCallback(naverLogin.accessToken.accessToken);
      } else {
        window.opener.failureCallback();
      }
      window.close();
    });
  }
};

const appendNaverButton = () => {
  if (document && document.querySelectorAll('#naverIdLogin').length === 0) {
    const naverId = document.createElement('div');
    naverId.id = 'naverIdLogin';
    naverId.style.position = 'absolute';
    naverId.style.top = '-10000px';
    document.body.appendChild(naverId);
  }
};
const loadScript = (props) => {
  if (document && document.querySelectorAll('#naver-login-sdk').length === 0) {
    const script = document.createElement('script');
    script.id = 'naver-login-sdk';
    script.src = NAVER_ID_SDK_URL;
    script.onload = () => initLoginButton(props);
    document.head.appendChild(script);
  }
};

class LoginNaver extends React.Component {
  componentDidMount() {
    if (!('browser' in process)) {
      return;
    }
    appendNaverButton();
    loadScript(this.props);
  }

  render() {
    const { render } = this.props;
    return (
      render({
        onClick: () => {
          if (!document || !document.querySelector('#naverIdLogin').firstChild) return;
          const naverLoginButton = document.querySelector('#naverIdLogin').firstChild;
          naverLoginButton.click();
        },
      })
    );
  }
}

LoginNaver.propTypes = {
  render: PropTypes.func,
};

export default LoginNaver;
