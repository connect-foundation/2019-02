import React from 'react';
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
  const historyCardList = data && data.length > 0
    ? data.filter(filterToDomain).map(mapToCardComponent)
    : [];

  const isDataExist = () => historyCardList.length > 0;
  const isSpeaker = () => historyState === 'speaker';

  return (
    <>
      <S.UserHistory>
        {isSpeaker()
          ? (
            <S.UserHistoryTitle>
              {isDataExist()
                ? HISTORY_SPEAKER_TITLE
                : ALERT_HISTORY_SPEAKER_TITLE}
            </S.UserHistoryTitle>
          )
          : (
            <S.UserHistoryTitle>
              {isDataExist()
                ? HISTORY_LISTENER_TITLE
                : ALERT_HISTORY_LISTENER_TITLE}
            </S.UserHistoryTitle>
          )}
        <S.UserHistoryContents>
          {isDataExist() && historyCardList}
        </S.UserHistoryContents>
      </S.UserHistory>
    </>
  );
};

UserHistory.propTypes = {
  historyState: PropTypes.string.isRequired,
};

export default UserHistory;
