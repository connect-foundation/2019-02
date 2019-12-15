import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import UserHistoryCard from '../UserHistoryCard';
import { LoadingModal } from '@/components/common';
import {
  LODING_HISTORY_MESSAGE,
  HISTORY_SPEAKER_TITLE,
  ALERT_HISTORY_SPEAKER_TITLE,
  HISTORY_LISTENER_TITLE,
  ALERT_HISTORY_LISTENER_TITLE,
} from '@/constants';
import { useGetUserHistories, useGetUserStatus } from '@/hooks';
import dateParser from '@/utils/date';
import S from './style';

const UserHistory = (props) => {
  const { historyState } = props;
  const { userId } = useGetUserStatus();
  const { data, loading } = useGetUserHistories();

  if (!data || loading) {
    return (<LoadingModal message={LODING_HISTORY_MESSAGE} />);
  }

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
        channelName={channel.channelOptions.channelName}
        displayName={channel.master.displayName}
      />
    );
  };
  const noneHistoryCardRender = (
    <S.Alert>
      <span aria-label="really" role="img">🤭</span>
      <span>기록이 없어요.</span>
    </S.Alert>
  );
  const historyCardList = data && data.length > 0
    ? data.filter(filterToDomain).map(mapToCardComponent)
    : noneHistoryCardRender;

  return (
    <>
      <S.UserHistory>
        {historyState === 'speaker'
          ? (
            <S.UserHistoryTitle>
              {HISTORY_SPEAKER_TITLE}
            </S.UserHistoryTitle>
          )
          : (
            <S.UserHistoryTitle>
              {HISTORY_LISTENER_TITLE}
            </S.UserHistoryTitle>
          )}
        <S.UserHistoryContents>
          {historyCardList.length === 0
            ? noneHistoryCardRender
            : historyCardList}
        </S.UserHistoryContents>
      </S.UserHistory>
    </>
  );
};

UserHistory.propTypes = {
  historyState: PropTypes.string.isRequired,
};

export default UserHistory;
