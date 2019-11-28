import React from 'react';
import PropTypes from 'prop-types';
import UserHistoryCard from '../UserHistoryCard';
import S from './style';

const UserHistory = (props) => {
  const { historyState } = props;
  return (

    <>
      <S.UserHistory>
        {historyState === 'speaker'
          ? <>김도현님이 스피커로 방문하셨던 채널이에요!</>
          : <>김도현님이 리스너로 방문하셨던 채널이에요!</>}

        <S.UserHistoryContents>
          <UserHistoryCard />
          <UserHistoryCard />
          <UserHistoryCard />
          <UserHistoryCard />
          <UserHistoryCard />
          <UserHistoryCard />
          <UserHistoryCard />
        </S.UserHistoryContents>
      </S.UserHistory>
    </>
  );
};

UserHistory.propTypes = {
  historyState: PropTypes.string.isRequired,
};

export default UserHistory;
