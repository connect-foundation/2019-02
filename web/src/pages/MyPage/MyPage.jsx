import React from 'react';
import { UserInfo, UserHistory } from '@/components/history';
import S from './style';

const MyPage = () => (
  <>
    <S.MyPageWrapper>
      <UserInfo />
      <UserHistory />
    </S.MyPageWrapper>
  </>
);

export default MyPage;
