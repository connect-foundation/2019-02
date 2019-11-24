import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const ChannelButton = (props) => {
  const { onClick } = props;

  return (
    <S.ChannelButton onClick={onClick}>채널 만들기</S.ChannelButton>
  );
};

ChannelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ChannelButton;
