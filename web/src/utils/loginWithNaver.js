import * as React from 'react';
import PropTypes from 'prop-types';
import { NAVER_ID_SDK_URL } from '@/constants';

const initLoginButton = (props) => {
  if (!('browser' in process)) return;

  const { naver } = window;
  const {
    clientId,
    callbackUrl,
    onSuccess,
    onFailure,
  } = props;

  const naverLogin = new naver.LoginWithNaverId(
    {
      callbackUrl,
      clientId,
      isPopup: true,
      callbackHandle: true,
      loginButton: {},
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

class LoginWithNaver extends React.Component {
  componentDidMount() {
    if (!('browser' in process)) return;
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

LoginWithNaver.propTypes = {
  render: PropTypes.func,
};

export { LoginWithNaver, loadScript };
