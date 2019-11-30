import React, { useState } from 'react';
import { UserInfo, UserHistory } from '@/components/history';
import S from './style';

const MyPage = () => {
  const [historyState, setHistoryState] = useState('speaker');

  return (
    <>
      <S.MyPageWrapper>
        <UserInfo setHistoryState={setHistoryState} />
        <UserHistory historyState={historyState} />
      </S.MyPageWrapper>
    </>
  );
};

export default MyPage;
