import React from 'react';
import PropTypes from 'prop-types';
import {
  GoogleButton,
  KakaoButton,
} from '../LoginButton';
import S from './style';

const LoginPopover = (props) => {
  const { handleClose } = props;

  return (
    <S.PopoverWrapper>
      <S.BtnWrapper>
        <GoogleButton handleClose={handleClose} />
      </S.BtnWrapper>
      <S.BtnWrapper>
        <KakaoButton handleClose={handleClose} />
      </S.BtnWrapper>
      <S.BtnWrapper>
        <S.Link to="/privacy-policy" onClick={handleClose}>개인정보 처리방침 보기</S.Link>
      </S.BtnWrapper>
    </S.PopoverWrapper>
  );
};

LoginPopover.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default LoginPopover;
