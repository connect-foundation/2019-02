import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import gql from 'graphql-tag';

const LOGIN = gql`
  mutation LogIn($token: String!, $displayName: String!) {
    logIn(token: $token, displayName: $displayName) @client
  }
`;

const GoogleLoginButton = (props) => {
  const { onClick } = props;
  return <S.LoginBtn type="button" onClick={onClick}>Google Login</S.LoginBtn>;
};

const GoogleButton = (props) => {
  const { handleClose } = props;
  const [logIn] = useMutation(LOGIN);
  const handleResponse = (response) => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: 'application/json' },
    );
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
      render={({ onClick }) => (
        <GoogleLoginButton onClick={() => {
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
  background-color:#fff;
  height:100%;
  border-radius:2px;
  box-shadow:rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px;
  `,
};

GoogleLoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
GoogleButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default GoogleButton;
