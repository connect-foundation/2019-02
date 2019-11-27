import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { authByGoogle } from '@/apis';
import { useLogin } from '@/hooks';
import S from './style';

const GoogleButton = (props) => {
  const { handleClose } = props;
  const { mutate } = useLogin();
  const handleResponse = async ({ accessToken }) => {
    const { token, user: { displayName, userId } } = await authByGoogle(accessToken);
    if (token) {
      mutate({ variables: { token, displayName, userId } });
    }
  };
  const handleFailure = (error) => {
    console.error(error);
  };

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_ID}
      render={({ onClick }) => (
        <S.GoogleLoginButton
          onClick={() => {
            handleClose();
            onClick();
          }}
        >
          Google Login
        </S.GoogleLoginButton>
      )}
      onSuccess={handleResponse}
      onFailure={handleFailure}
    />
  );
};

GoogleButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default GoogleButton;
