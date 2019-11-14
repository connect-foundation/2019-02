import React from 'react';
import KakaoLogin from 'react-kakao-login';
import { useMutation } from '@apollo/react-hooks';
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
    fetch(`http://localhost:4000/auth/kakao?access_token=${response.access_token}`, options).then((res) => {
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
    <KakaoLogin
      jsKey={process.env.KAKAO_ID}
      buttonText="Kakao Login"
      onSuccess={handleResponse}
      onFailure={handleFailure}
    />
  );
};

export default KakaoButton;
