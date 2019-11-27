import React from 'react';
import UserHistoryCard from '../UserHistoryCard';
import S from './style';

const UserHistory = () => (
  <>
    <S.UserHistoryWrapper>
      김도현님이 리스너로 방문하셨던 채널이에요!
      <S.UserHistoryContents>
        <UserHistoryCard />
        <UserHistoryCard />
        <UserHistoryCard />
        <UserHistoryCard />
        <UserHistoryCard />
        <UserHistoryCard />
        <UserHistoryCard />
      </S.UserHistoryContents>
    </S.UserHistoryWrapper>
  </>
);

export default UserHistory;
