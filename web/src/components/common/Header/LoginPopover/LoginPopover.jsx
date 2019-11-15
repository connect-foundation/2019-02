import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GoogleButton from '../LoginButton/GoogleButton';
import KakaoButton from '../LoginButton/KakaoButton';
import NaverButton from '../LoginButton/NaverButton';

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

const S = {
  PopoverWrapper: styled.div`
    width:200px;
    padding:20px 15px;
  `,
  BtnWrapper: styled.div`
    width:100%;
    height:40px;
    margin-bottom:15px;
    &:last-child{
      margin-bottom:0;
    }
  `,
};

LoginPopover.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default LoginPopover;
