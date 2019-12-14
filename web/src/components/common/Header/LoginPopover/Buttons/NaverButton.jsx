import React from 'react';
import PropTypes from 'prop-types';
import NaverLogin from '@/utils/naverLogin';
import { useLogin } from '@/hooks';
import { authByNaver } from '@/apis';
import { NAVER_AUTH_CALLBACK } from '@/constants';
import S from './style';

const NaverButton = (props) => {
  const { handleClose } = props;
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
    <NaverLogin
      clientId={process.env.NAVER_ID}
      callbackUrl="http://localhost:8000/login"
      render={({ onClick }) => (
        <S.NaverLoginButton onClick={() => {
          handleClose();
          onClick();
        }}
        >
          네이버 로그인
        </S.NaverLoginButton>
      )}
      onSuccess={handleResponse}
      onFailure={handleFailure}
    />
  );
};

NaverButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default NaverButton;
