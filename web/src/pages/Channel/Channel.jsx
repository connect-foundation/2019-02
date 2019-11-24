import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import S from './style';

const Channel = () => {
  const { params: { channelId } } = useRouteMatch();

  return (
    <S.ChannelWrapper>
      채널아이디 :
      {channelId}
    </S.ChannelWrapper>
  );
};

export default Channel;
