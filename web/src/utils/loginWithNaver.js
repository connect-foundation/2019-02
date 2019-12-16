import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { NAVER_ID_SDK_URL } from '@/constants';

const checkBrowser = () => !('browser' in process);
const selectNode = (selector) => document.querySelector(selector);
const checkNode = (selector) => document && !document.querySelectorAll(selector).length;
const handleLogin = (naverLogin) => {
  const { opener } = window;
  const { accessToken } = naverLogin.accessToken;

  naverLogin.getLoginStatus((status) => {
    if (status) {
      opener.naver.successCallback(accessToken);
    } else {
      opener.failureCallback();
    }
    window.close();
  });
};
const initLoginButton = (props) => {
  if (checkBrowser()) return;

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
    handleLogin(naverLogin);
  }
};

const appendNaverButton = () => {
  if (!checkNode('#naverIdLogin')) return;

  const naverId = document.createElement('div');
  naverId.id = 'naverIdLogin';
  naverId.style.position = 'absolute';
  naverId.style.top = '-10000px';
  document.body.appendChild(naverId);
};

const loadScript = (props) => {
  if (!checkNode('#naver-login-sdk')) return;

  const script = document.createElement('script');
  script.id = 'naver-login-sdk';
  script.src = NAVER_ID_SDK_URL;
  script.onload = () => initLoginButton(props);
  document.head.appendChild(script);
};

const LoginWithNaver = (props) => {
  const { render } = props;

  useEffect(() => {
    if (checkBrowser()) return;

    appendNaverButton();
    loadScript(props);
  }, []);

  return (
    <>
      {render({
        onClick: () => {
          if (!document || !selectNode('#naverIdLogin').firstChild) return;
          const naverLoginButton = selectNode('#naverIdLogin').firstChild;
          naverLoginButton.click();
        },
      })}
    </>
  );
};

LoginWithNaver.propTypes = {
  render: PropTypes.func,
};

export default LoginWithNaver;
