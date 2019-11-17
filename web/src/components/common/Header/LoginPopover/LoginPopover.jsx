import React from 'react';
import PropTypes from 'prop-types';
import { 
  GoogleButton, 
  KakaoButton, 
  NaverButton, 
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
        <NaverButton handleClose={handleClose} />
      </S.BtnWrapper>
    </S.PopoverWrapper>
  );
};

LoginPopover.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default LoginPopover;
