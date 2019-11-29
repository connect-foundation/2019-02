import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { authByGoogle } from '@/apis';
import { useLogin } from '@/hooks';
import S from './style';

const GoogleButton = (props) => {
  const { showError } = props;
  const logIn = useLogin();
  const handleResponse = async ({ accessToken }) => {
    const { token, user: { displayName, userId } } = await authByGoogle(accessToken);
    if (token) logIn({ token, userId, displayName });
  };
  const handleFailure = (error) => {
    console.error(error);
  };

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_ID}
      render={() => (
        <S.GoogleLoginButton onClick={() => showError()}>
          구글 로그인
        </S.GoogleLoginButton>
      )}
      onSuccess={handleResponse}
      onFailure={handleFailure}
    />
  );
};

GoogleButton.propTypes = {
  showError: PropTypes.func.isRequired,
};

export default GoogleButton;
