import React from 'react';
import NaverLogin from 'react-naver-login';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { authByNaver } from '@/apis';
import { NAVER_AUTH_CALLBACK } from '@/constants';

const NaverLoginButton = (props) => {
  const { onClick } = props;
  return <S.LoginBtn type="button" onClick={onClick}>Naver Login</S.LoginBtn>;
};

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
        <NaverLoginButton onClick={() => {
          handleClose();
          onClick();
        }}
        />
      )}
      onSuccess={handleResponse}
      onFailure={handleFailure}
    />
  );
};

const S = {
  LoginBtn: styled('button')`
  width:100%;
  background-color:#2db400;
  height:100%;
  border-radius:2px;
  box-shadow:rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
  `,
};

NaverLoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
NaverButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default NaverButton;
