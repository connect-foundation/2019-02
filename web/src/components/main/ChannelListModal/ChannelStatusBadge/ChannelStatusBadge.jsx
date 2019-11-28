import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const ChannelStatusBadge = (props) => {
  const { channelStatus } = props;

  return (
    <S.ChannelStatusBadge channelStatus={channelStatus}>
      <span aria-label="sync" role="img">🐥</span>
      <span>
        presentation-
        {channelStatus}
      </span>
    </S.ChannelStatusBadge>
  );
};

ChannelStatusBadge.propTypes = {
  channelStatus: PropTypes.string.isRequired,
};

export default ChannelStatusBadge;
