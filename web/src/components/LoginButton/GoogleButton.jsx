import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const LOGIN = gql`
  mutation LogIn($token: String!, $displayName: String!) {
    logIn(token: $token, displayName: $displayName) @client
  }
`;

const GoogleButton = () => {
  const [logIn] = useMutation(LOGIN);
  const handleResponse = (response) => {
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
    const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default',
    };
    fetch('http://localhost:4000/auth/google', options).then((res) => {
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
    <GoogleLogin
      clientId={process.env.GOOGLE_ID}
      buttonText="Google Login"
      onSuccess={handleResponse}
      onFailure={handleFailure}
    />
  );
};

export default GoogleButton;
