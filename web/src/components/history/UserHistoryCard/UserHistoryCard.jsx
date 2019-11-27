import React from 'react';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import S from './style';

const UserHistoryCard = () => (
  <>
    <S.HistoryCard>
      <S.HistoryCardLeftDetail>
        <Typography variant="subtitle1" color="textSecondary">
              2019-11-26
        </Typography>
        <Typography component="h5" variant="h5">
              김김이조의 채널입니다.
        </Typography>
      </S.HistoryCardLeftDetail>
      <S.HistoryCardRightDetail>
        <Typography variant="subtitle1">
          <Chip
            icon={<FaceIcon />}
            label="현재 생방송중!"
            color="primary"
            variant="outlined"
          />
        </Typography>
        <Typography component="h6" variant="h6">
          DOHYUN KIM
        </Typography>
      </S.HistoryCardRightDetail>
      <S.HistoryCardMiddleDetail>
        <S.Profile />
      </S.HistoryCardMiddleDetail>
    </S.HistoryCard>
  </>
);

export default UserHistoryCard;
