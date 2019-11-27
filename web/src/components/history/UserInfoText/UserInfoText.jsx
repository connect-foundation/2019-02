import React from 'react';
import { useGetUserStatus } from '@/hooks';
import S from './style';

const UserInfoText = () => {
  const { userId, displayName } = useGetUserStatus();
  const showUserId = userId || '별명을 지어보세요!';

  return (
    <>
      <S.UserInfoText>
        {displayName}
      </S.UserInfoText>
      <S.UserInfoText>
        {showUserId}
      </S.UserInfoText>
    </>
  );
};

export default UserInfoText;
