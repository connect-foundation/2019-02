import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ChatInput, ChatLogs } from '@/components/channel';
import S from './style';

const Channel = () => {
  const { params: { channelId } } = useRouteMatch();

  return (
    <S.ChannelWrapper>
      <ChatInput channelId={channelId} />
      <ChatLogs channelId={channelId} />
    </S.ChannelWrapper>
  );
};

export default Channel;
