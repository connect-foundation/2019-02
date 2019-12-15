import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LoginWithNaver } from '@/utils/loginWithNaver';
import { useLogin } from '@/hooks';
import { authByNaver } from '@/apis';
import { NAVER_AUTH_CALLBACK } from '@/constants';

const S = {
  Empty: styled.div`
    display: none;
  `,
};
const NaverLogin = (props) => {
  const { component } = props;
  const buttonComponent = component || (() => <S.Empty></S.Empty>);
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
