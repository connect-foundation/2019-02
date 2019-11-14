import React from 'react';
import NaverLogin from 'react-naver-login';
import PropTypes from 'prop-types';

const NaverLoginButton = (props) => {
  const { onClick } = props;
  return <button type="button" onClick={onClick}>Naver Login</button>;
};

const NaverButton = () => {
  const handleResponse = (response) => {
    console.log('naver res', response);
  };
  const handleFailure = (error) => {
    console.log(error);
  };

  return (
    <NaverLogin
      clientId={process.env.NAVER_ID}
      callbackUrl="http://localhost:4000/auth/naver/callback"
      render={NaverLoginButton}
      onSuccess={handleResponse}
      onFailure={handleFailure}
    />
  );
};

NaverLoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NaverButton;
