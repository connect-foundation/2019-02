import React, { useState } from 'react';
import { useGetUserStatus } from '@/hooks';
import ErrorModal from '@/components/common/ErrorModal';
import { UserInfo, UserHistory } from '@/components/history';
import { LOGIN_STATUS_ERROR_MESSAGE } from '@/constants';
import S from './style';

const MyPage = () => {
  const [historyState, setHistoryState] = useState('speaker');
  const { displayName } = useGetUserStatus();

  return (
    <S.MyPage>
      {displayName !== null
        ? (
          <S.MyPageWrapper>
            <UserInfo setHistoryState={setHistoryState} />
            <UserHistory historyState={historyState} />
          </S.MyPageWrapper>
        )
        : <ErrorModal message={LOGIN_STATUS_ERROR_MESSAGE} />}
    </S.MyPage>
  );
};

export default MyPage;
