import React from 'react';
import PropTypes from 'prop-types';
import UserHistoryCard from '../UserHistoryCard';
import { useGetUserHistories, useGetUserStatus } from '@/hooks';
import dateParser from '@/utils/date';
import S from './style';

const UserHistory = (props) => {
  const { historyState } = props;
  const { userId, displayName } = useGetUserStatus();
  const { data, loading } = useGetUserHistories();

  if (loading) return <p>데이터 가져오는 중...</p>;

  const filterToDomain = ({ channel: { master } }) => (historyState === 'speaker'
    ? master.userId === userId
    : master.userId !== userId);
  const mapToCardComponent = (historyInfo) => {
    const { channel, updatedAt } = historyInfo;
    const updatedDate = dateParser(updatedAt);

    return (
      <UserHistoryCard
        key={channel.channelId}
        channelId={channel.channelId}
        channelStatus={channel.channelStatus}
        updatedAt={updatedDate}
        channelName={channel.channelName}
        displayName={channel.master.displayName}
      />
    );
  };
  const historyCardList = data && data.length > 0
    ? data.filter(filterToDomain).map(mapToCardComponent)
    : (
      <S.Alert>
        <span aria-label="really" role="img">🤭</span>
        아직 채널을 한번도 생성 안해보셨네요??
      </S.Alert>
    );

  return (
    <>
      <S.UserHistory>
        {historyState === 'speaker'
          ? (
            <S.UserHistoryTitle>
              {displayName}
              님이 스피커로 방문하셨던 채널이에요!
            </S.UserHistoryTitle>
          )
          : (
            <S.UserHistoryTitle>
              {displayName}
              님이 리스너로 방문하셨던 채널이에요!
            </S.UserHistoryTitle>
          )}

        <S.UserHistoryContents>
          {historyCardList}
        </S.UserHistoryContents>
      </S.UserHistory>
    </>
  );
};

UserHistory.propTypes = {
  historyState: PropTypes.string.isRequired,
};

export default UserHistory;
