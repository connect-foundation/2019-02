import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  NaverButton,
  KakaoButton,
  GoogleButton,
} from '../LoginButton';
import S from './style';

const TEMP_ERROR_MESSAGE = '네이버, 구글 로그인은 현재 서비스약관 인증단계에 있어서 사용이 어렵습니다.';

const LoginPopover = (props) => {
  const [isError, setIsError] = useState(false);
  const { handleClose } = props;
  const showError = () => setIsError(true);

  return (
    <S.PopoverWrapper>
      <S.BtnWrapper>
        <NaverButton handleClose={handleClose} showError={showError} />
      </S.BtnWrapper>
      <S.BtnWrapper>
        <KakaoButton handleClose={handleClose} />
      </S.BtnWrapper>
      <S.BtnWrapper>
        <GoogleButton handleClose={handleClose} showError={showError} />
      </S.BtnWrapper>
      <S.BtnWrapper>
        <S.Link to="/privacy-policy" onClick={handleClose}>개인정보 처리방침 보기</S.Link>
      </S.BtnWrapper>
      {isError && <S.TempError>{TEMP_ERROR_MESSAGE}</S.TempError>}
    </S.PopoverWrapper>
  );
};

LoginPopover.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default LoginPopover;
