import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@material-ui/core';
import {
  NaverButton,
  KakaoButton,
  GoogleButton,
  PrivacyLink,
} from './Buttons';
import S from './style';

const TEMP_ERROR_MESSAGE = '네이버, 구글 로그인은 현재 서비스약관 인증단계에 있어서 사용이 어렵습니다.';

const LoginPopover = (props) => {
  const {
    id,
    isOpened,
    anchorEl,
    onClose,
  } = props;
  const [isError, setIsError] = useState(false);
  const showError = () => setIsError(true);

  return (
    <Popover
      id={id}
      open={isOpened}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <S.PopoverWrapper>
        <S.BtnWrapper>
          <NaverButton handleClose={onClose}/>
        </S.BtnWrapper>
        <S.BtnWrapper>
          <KakaoButton handleClose={onClose} />
        </S.BtnWrapper>
        <S.BtnWrapper>
          <GoogleButton handleClose={onClose} showError={showError} />
        </S.BtnWrapper>
        <S.BtnWrapper>
          <PrivacyLink onClick={onClose} />
        </S.BtnWrapper>
        {isError && <S.TempError>{TEMP_ERROR_MESSAGE}</S.TempError>}
      </S.PopoverWrapper>
    </Popover>
  );
};

LoginPopover.propTypes = {
  id: PropTypes.string,
  isOpened: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default LoginPopover;
