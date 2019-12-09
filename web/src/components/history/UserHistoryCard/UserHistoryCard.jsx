import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { SmallButton } from '@/components/common';
import S from './style';

const UserHistoryCard = (props) => {
  const {
    channelId,
    channelStatus,
    updatedAt,
    channelName,
    displayName,
  } = props;
  const channelCode = channelId.substring(0, 5);
  const presentationStatus = channelStatus === 'on'
    ? { label: 'presentation-on', color: 'primary' }
    : { label: 'presentation-off', color: 'default' };

  return (
    <>
      <S.HistoryCard>
        <Link to={`/channels/${channelId}`}>
          <S.HistoryCardLeftDetail>
            <Typography variant="subtitle1" color="textSecondary">
              {`${updatedAt} ~ 2020년 1월 15일`}
            </Typography>
            <Typography component="h5" variant="h5">
              {`${channelName} | ${displayName}`}
            </Typography>
          </S.HistoryCardLeftDetail>
          <S.HistoryCardRightDetail>
            <Typography variant="subtitle1">
              <SmallButton color={presentationStatus.color}>
                <span aria-label="sync" role="img">🐥</span>
                {presentationStatus.label}
              </SmallButton>
            </Typography>
            <S.ChannelCode>
              {`채널코드 : ${channelCode}`}
            </S.ChannelCode>
          </S.HistoryCardRightDetail>
        </Link>
      </S.HistoryCard>
    </>
  );
};

UserHistoryCard.propTypes = {
  channelId: PropTypes.string.isRequired,
  channelStatus: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
};

export default UserHistoryCard;
