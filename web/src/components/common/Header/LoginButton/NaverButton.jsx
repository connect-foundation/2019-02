import React from 'react';
import PropTypes from 'prop-types';
import NaverLogin from 'react-naver-login';
import { authByNaver } from '@/apis';
import { NAVER_AUTH_CALLBACK } from '@/constants';
import S from './style';

const NaverButton = (props) => {
  const { showError } = props;
  const handleResponse = ({ accessToken }) => {
    authByNaver(accessToken);
  };
  const handleFailure = (error) => {
    console.error(error);
  };

  return (
    <NaverLogin
      clientId={process.env.NAVER_ID}
      callbackUrl={NAVER_AUTH_CALLBACK}
      render={() => (
        <S.NaverLoginButton onClick={() => showError()}>
          네이버 로그인
        </S.NaverLoginButton>
      )}
      onSuccess={handleResponse}
      onFailure={handleFailure}
    />
  );
};

NaverButton.propTypes = {
  showError: PropTypes.func.isRequired,
};

export default NaverButton;
