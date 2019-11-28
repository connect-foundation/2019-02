import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import S from './style';

const UserHistoryCard = (props) => {
  const { historyInfo } = props;
  const label = historyInfo.channelStatus === 'on' ? '현재 생방송중!' : '종료된 채널';
  const color = historyInfo.channelStatus === 'on' ? 'primary' : 'default';

  return (
    <>
      <S.HistoryCard>
        <S.HistoryCardLeftDetail>
          <Typography variant="subtitle1" color="textSecondary">
            {historyInfo.updatedAt}
          </Typography>
          <Typography component="h5" variant="h5">
            {historyInfo.channelName}
          </Typography>
        </S.HistoryCardLeftDetail>
        <S.HistoryCardRightDetail>
          <Typography variant="subtitle1">
            <Chip
              icon={<FaceIcon />}
              label={label}
              color={color}
              variant="outlined"
            />
          </Typography>
          <Typography component="h6" variant="h6">
            {historyInfo.displayName}
          </Typography>
        </S.HistoryCardRightDetail>
        <S.HistoryCardMiddleDetail>
          <S.Profile />
        </S.HistoryCardMiddleDetail>
      </S.HistoryCard>
    </>
  );
};

UserHistoryCard.propsTypes = {
  historyInfo: PropTypes.shape({
    channelStatus: PropTypes.string.isRequired,
    updatedAt: PropTypes.date,
    channelName: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserHistoryCard;
