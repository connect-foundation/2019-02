import React from 'react';
import PropTypes from 'prop-types';
import { NaverLogin } from '@/components/base';
import S from './style';

const NaverButton = (props) => {
  const { handleClose } = props;
  return (
    <NaverLogin
      component={({ onClick }) => (
        <S.NaverLoginButton onClick={() => {
          handleClose();
          onClick();
        }}
        >
          네이버 로그인
        </S.NaverLoginButton>
      )}
    />
  );
};

NaverButton.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default NaverButton;
