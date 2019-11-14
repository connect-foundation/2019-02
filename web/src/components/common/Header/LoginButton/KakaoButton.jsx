import React from 'react';
import KakaoLogin from 'react-kakao-login';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import gql from 'graphql-tag';

const LOGIN = gql`
  mutation LogIn($token: String!, $displayName: String!) {
    logIn(token: $token, displayName: $displayName) @client
  }
`;

const KakaoButton = () => {
  const [logIn] = useMutation(LOGIN);
  const handleResponse = ({ response }) => {
    const options = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
    };
    fetch(
      `http://localhost:4000/auth/kakao?access_token=${response.access_token}`,
      options,
    ).then((res) => {
      const token = res.headers.get('x-auth-token');
      res.json().then((user) => {
        if (token) {
          logIn({ variables: { token, displayName: user.displayname } });
        }
      });
    });
  };
  const handleFailure = (error) => {
    console.log(error);
  };

  return (
    <S.LoginBtn
      jsKey={process.env.KAKAO_ID}
      buttonText="Kakao Login"
      onSuccess={handleResponse}
      onFailure={handleFailure}
    />
  );
};

const S = {
  LoginBtn: styled(KakaoLogin)`
  width:100%;
  background-color:#fee102;
  height:100%;
  border-radius:2px;
  box-shadow:rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
  `,
};


export default KakaoButton;
