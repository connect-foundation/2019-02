import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';

const LoginButton = () => {
  const [state, setState] = useState({ isAuthenticated: false, user: null, token: '' });

  const googleResponse = (response) => {
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
          setState({ isAuthenticated: true, user, token });
        }
      });
    });
  };

  const onFailure = (error) => {
    console.log(error);
  };
  return (
    <>
      { state.isAuthenticated
        ? <div>{state.user.displayname}</div>
        : (
          <GoogleLogin
            clientId={process.env.GOOGLE_ID}
            buttonText="Login"
            onSuccess={googleResponse}
            onFailure={onFailure}
          />
        )}
    </>
  );
};

export default LoginButton;
