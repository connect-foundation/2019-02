import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ChannelContext } from '@/contexts';
import { useCheckChannel } from '@/hooks';
import { Chat, Slide, ToolBar } from '@/components/channel';
import S from './style';

const Channel = () => {
  const { params: { channelId } } = useRouteMatch();
  const { data } = useCheckChannel(channelId);

  if (!data) return null;
  if (data.status === 'not_exist') {
    return (
      <div>존재하지 않는 채널입니다...</div>
    );
  }

  return (
    <ChannelContext.Provider
      value={{ isMaster: data.isMaster }}
    >
      <S.ChannelWrapper>
        <ToolBar />
        <Slide />
        <Chat channelId={channelId} />
      </S.ChannelWrapper>
    </ChannelContext.Provider>
  );
};

export default Channel;
