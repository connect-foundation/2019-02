import React from 'react';
import UserInfoText from '../UserInfoText';
import UserInfoButton from '../UserInfoButton';
import S from './style';

const UserInfo = () => (
  <>
    <S.UserInfoWrapper>
      <S.Profile />
      <UserInfoText />
      <UserInfoText />
      <UserInfoButton />
      <UserInfoButton />
    </S.UserInfoWrapper>
  </>
);

export default UserInfo;
