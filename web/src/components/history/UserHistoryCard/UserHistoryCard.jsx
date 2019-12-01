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
  const presentationStatus = channelStatus === 'on'
    ? { label: 'presentation-on', color: 'primary' }
    : { label: 'presentation-off', color: 'default' };

  return (
    <>
      <Link to={`/channels/${channelId}`}>
        <S.HistoryCard>
          <S.HistoryCardLeftDetail>
            <Typography variant="subtitle1" color="textSecondary">
              {updatedAt}
            </Typography>
            <Typography component="h5" variant="h5">
              {channelName}
            </Typography>
          </S.HistoryCardLeftDetail>
          <S.HistoryCardRightDetail>
            <Typography variant="subtitle1">
              <SmallButton color={presentationStatus.color}>
                <span aria-label="sync" role="img">🐥</span>
                {presentationStatus.label}
              </SmallButton>
            </Typography>
            <Typography component="h6" variant="h6">
              {displayName}
            </Typography>
          </S.HistoryCardRightDetail>
          <S.HistoryCardMiddleDetail>
            <S.Profile />
          </S.HistoryCardMiddleDetail>
        </S.HistoryCard>
      </Link>
    </>
  );
};

UserHistoryCard.propTypes = {
  channelId: PropTypes.string.isRequired,
  channelStatus: PropTypes.string.isRequired,
  updatedAt: PropTypes.number.isRequired,
  channelName: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
};

export default UserHistoryCard;
