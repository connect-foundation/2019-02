import React from 'react';
import KakaoLogin from 'react-kakao-login';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { authByKakao } from '@/apis';

const LOGIN = gql`
  mutation LogIn($token: String!, $displayName: String!) {
    logIn(token: $token, displayName: $displayName) @client
  }
`;

const KakaoLoginButton = (props) => {
  const { onClick } = props;
  return <S.LoginBtn type="button" onClick={onClick}>Kakao Login</S.LoginBtn>;
};

const KakaoButton = (props) => {
  const { handleClose } = props;
  const [logIn] = useMutation(LOGIN);
  const handleResponse = async ({ response }) => {
    const { token, user } = await authByKakao(response.access_token);

    if (token) {
      logIn({ variables: { token, displayName: user.displayname } });
    }
  };
  const handleFailure = (error) => {
    console.log(error);
  };

  return (
    <KakaoLogin
      jsKey={process.env.KAKAO_ID}
      render={({ onClick }) => (
        <KakaoLoginButton onClick={() => {
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
  LoginBtn: styled.button`
  width:100%;
  background-color:#fee102;
  height:100%;
  border-radius:2px;
  box-shadow:rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
  `,
};

KakaoLoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
KakaoButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default KakaoButton;
