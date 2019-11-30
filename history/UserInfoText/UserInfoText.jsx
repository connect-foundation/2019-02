import React from 'react';
import { useGetUserStatus } from '@/hooks';
import S from './style';

const UserInfoText = () => {
  const { displayName } = useGetUserStatus();

  return (
    <>
      <S.UserInfoText>
        {displayName}
      </S.UserInfoText>
    </>
  );
};

export default UserInfoText;
