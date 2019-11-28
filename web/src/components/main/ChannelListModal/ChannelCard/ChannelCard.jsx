import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import S from './style';
import ChannelStatusBadge from '../ChannelStatusBadge';

const ChannelCard = (props) => {
  const {
    channelId,
    channelName,
    channelCode,
    masterName,
    channelStatus,
  } = props;
  const [clicked, setClicked] = useState(false);
  const handleOnClick = () => {
    setClicked(true);
  };

  if (clicked) return <Redirect to={`/channels/${channelId}`} />;

  return (
    <S.ChannelCard onClick={handleOnClick}>
      <S.ChannelCardContent>
        <S.ChannelInfo>
          <S.ChannelName>{channelName}</S.ChannelName>
          {masterName}
          님의 채널
        </S.ChannelInfo>
        <S.ChannelSubInfo>
          <ChannelStatusBadge channelStatus={channelStatus} />
          <S.ChannelCode>
            채널 코드:
            {channelCode}
          </S.ChannelCode>
        </S.ChannelSubInfo>
      </S.ChannelCardContent>
    </S.ChannelCard>
  );
};

ChannelCard.propTypes = {
  channelId: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  channelCode: PropTypes.string.isRequired,
  masterName: PropTypes.string.isRequired,
  channelStatus: PropTypes.string.isRequired,
};

export default ChannelCard;
