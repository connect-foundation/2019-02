import React, { useEffect, useReducer } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ChannelContext } from '@/contexts';
import {
  useLogin,
  useGetUserStatus,
  useGetChannel,
  useAddUserHistory,
  toolBarInitState,
  toolBarReducer,
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
  const [toolBarState, toolBarDispatch] = useReducer(
    toolBarReducer,
    toolBarInitState,
  );

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
  if (['not_exist', 'fail'].includes(data.status)) {
    return (<ErrorModal message={NO_EXIST_CHANNEL_MESSAGE} />);
  }

  return (
    <ChannelContext.Provider
      value={{
        isMaster: data.isMaster,
        fileUrl: data.channel.fileUrl,
        slideUrls: data.channel.slideUrls,
        slideRatioList: data.channel.slideRatioList,
        initialSlide: data.channel.currentSlide,
        channelName: data.channel.channelName,
        masterName: data.channel.master.displayName,
        channelCode: data.channel.channelCode,
      }}
    >
      <S.Channel>
        {toolBarState.isToolBarActive && (
        <ToolBar
          toolBarDispatch={toolBarDispatch}
          toolBarState={toolBarState}
        />
        )}
        <Slide
          channelId={channelId}
          toolBarDispatch={toolBarDispatch}
        />
        <Chat channelId={channelId} userId={userStatus.userId} />
      </S.Channel>
    </ChannelContext.Provider>
  );
};

export default Channel;
