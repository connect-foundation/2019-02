import React from 'react';
import PropTypes from 'prop-types';
import NaverLogin from 'react-naver-login';
import { authByNaver } from '@/apis';
import { NAVER_AUTH_CALLBACK } from '@/constants';
import S from './style';

const NaverButton = (props) => {
  const { handleClose } = props;
  const handleResponse = ({ accessToken }) => {
    authByNaver(accessToken);
  };
  const handleFailure = (error) => {
    console.log(error);
  };

  return (
    <NaverLogin
      clientId={process.env.NAVER_ID}
      callbackUrl={NAVER_AUTH_CALLBACK}
      render={({ onClick }) => (
        <S.NaverLoginButton onClick={() => {
          handleClose();
          onClick();
        }}
        >
          Naver Login
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
