import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import S from './style';

const ChannelCard = (props) => {
  const { channelId, channelName, channelCode } = props;
  const [clicked, setClicked] = useState(false);
  const handleOnClick = () => {
    setClicked(true);
  };

  if (clicked) return <Redirect to={`/channels/${channelId}`} />;

  return (
    <S.ChannelCard onClick={handleOnClick}>
      {channelId}
      {channelName}
      {channelCode}
    </S.ChannelCard>
  );
};

ChannelCard.propTypes = {
  channelId: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  channelCode: PropTypes.string.isRequired,
};

export default ChannelCard;
