import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ChannelContext } from '@/contexts';
import {
  useCheckChannel,
  useCheckAndLoginAnonymous,
  useInitChatCached,
} from '@/hooks';
import { Chat, Slide, ToolBar } from '@/components/channel';
import S from './style';

const Channel = () => {
  const { params: { channelId } } = useRouteMatch();
  const { data } = useCheckChannel(channelId);

  useInitChatCached();
  useCheckAndLoginAnonymous();

  if (!data) return null;
  if (data.status === 'not_exist') {
    return (
      <div>존재하지 않는 채널입니다...</div>
    );
  }

  return (
    <ChannelContext.Provider
      value={{ isMaster: data.isMaster, slideUrls: data.slideUrls }}
    >
      <S.Channel>
        <ToolBar />
        <Slide />
        <Chat channelId={channelId} />
      </S.Channel>
    </ChannelContext.Provider>
  );
};

export default Channel;
