import React from 'react';
import PropTypes from 'prop-types';
import { LoginWithNaver } from '@/utils/loginWithNaver';
import { useLogin } from '@/hooks';
import { authByNaver } from '@/apis';
import { NAVER_AUTH_CALLBACK } from '@/constants';

const NaverLogin = (props) => {
  const { component } = props;
  const buttonComponent = component || (() => <></>);
  const logIn = useLogin();
  const handleResponse = async (accessToken) => {
    const { token, user: { displayName, userId } } = await authByNaver(accessToken);

    if (token) {
      logIn({ token, userId, displayName });
    }
  };
  const handleFailure = (error) => {
    console.error(error);
  };

  return (
    <LoginWithNaver
      clientId={process.env.NAVER_ID}
      callbackUrl={NAVER_AUTH_CALLBACK}
      render={buttonComponent}
      onSuccess={handleResponse}
      onFailure={handleFailure}
    />
  );
};

NaverLogin.propTypes = {
  component: PropTypes.func,
};
export default NaverLogin;
