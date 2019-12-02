import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ChannelContext } from '@/contexts';
import {
  useLogin,
  useGetUserStatus,
  useGetChannel,
  useInitChat,
  useAddUserHistory,
} from '@/hooks';
import { Chat, Slide, ToolBar } from '@/components/channel';
import { authByAnonymous } from '@/apis';
import S from './style';
import { NO_EXIST_CHANNEL_MESSAGE, ENTERING_CHANNEL_MESSAGGGE } from '@/constants';
import { LoadingModal, ErrorModal } from '@/components/common';


const Channel = () => {
  const { params: { channelId } } = useRouteMatch();
  const { data, loading } = useGetChannel(channelId);
  const logIn = useLogin();
  const userStatus = useGetUserStatus();
  const { mutate } = useAddUserHistory();

  useInitChat(channelId);
  useEffect(() => {
    if (userStatus.token) return;
    authByAnonymous().then(({ token, user }) => logIn({
      token,
      userId: user.userId,
      isAnonymous: true,
    }));
  }, [userStatus]);

  useEffect(() => {
    if (data && data.status === 'ok') {
      mutate({
        variables: {
          channelId,
        },
      });
    }
  }, [data]);

  if (!data || loading) {
    return (<LoadingModal message={ENTERING_CHANNEL_MESSAGGGE} />);
  }
  if (data.status === 'not_exist') {
    return (<ErrorModal message={NO_EXIST_CHANNEL_MESSAGE} />);
  }

  return (
    <ChannelContext.Provider
      value={{
        isMaster: data.isMaster,
        slideUrls: data.channel.slideUrls,
        initialSlide: data.channel.currentSlide,
        channelName: data.channel.channelName,
        masterName: data.channel.master.displayName,
        channelCode: data.channel.channelCode,
      }}
    >
      <S.Channel>
        <ToolBar />
        <Slide channelId={channelId} />
        <Chat channelId={channelId} />
      </S.Channel>
    </ChannelContext.Provider>
  );
};

export default Channel;
