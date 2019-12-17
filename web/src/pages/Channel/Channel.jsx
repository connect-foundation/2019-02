import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  useGetChannel,
  useAddUserHistory,
  useModal,
} from '@/hooks';
import { ChannelProvider } from '@/components/base';
import {
  Chat,
  Slide,
  SettingModal,
  Entrance,
  ToolBar,
} from '@/components/channel';
import {
  LoadingModal,
  ErrorModal,
} from '@/components/common';
import S from './style';
import {
  NO_EXIST_CHANNEL_MESSAGE,
  ENTERING_CHANNEL_MESSAGGGE,
  PRESENTATION_ON,
} from '@/constants';
import DropyCanvas from '@/utils/DropyCanvas';

const Channel = (props) => {
  const { user } = props;
  const { params: { channelId } } = useRouteMatch();
  const { data, loading } = useGetChannel(channelId);
  const { mutate } = useAddUserHistory();
  const {
    isModalOpened,
    openModal,
    closeModal,
  } = useModal();
  const dropyCanvas = new DropyCanvas();

  dropyCanvas.init();

  useEffect(() => {
    if (data && data.status === 'ok') {
      mutate({ variables: { channelId } });
    }
  }, [data]);

  if (!data || loading) {
    return (<LoadingModal message={ENTERING_CHANNEL_MESSAGGGE} />);
  }
  if (['not_exist', 'fail'].includes(data.status)) {
    return (<ErrorModal message={NO_EXIST_CHANNEL_MESSAGE} />);
  }

  const { isMaster, channel } = data;

  const channelContext = {
    channelId,
    isMaster,
    fileUrl: channel.fileUrl,
    slideUrls: channel.slideUrls,
    slideRatioList: channel.slideRatioList,
    initialSlide: channel.currentSlide,
    masterName: channel.master.displayName,
    channelCode: channel.channelCode,
    channelStatus: isMaster ? PRESENTATION_ON : channel.channelStatus,
    channelName: channel.channelOptions.channelName,
    anonymousChat: channel.channelOptions.anonymousChat,
    emojiEffect: channel.channelOptions.emojiEffect,
    listenerList: channel.listenerList,
    dropyCanvas,
  };
  console.log('channel listenerList', channel.listenerList);

  return (
    <ChannelProvider value={channelContext}>
      <Entrance channelId={channelId} isMaster={isMaster}>
        <S.Channel>
          <ToolBar />
          <Slide channelId={channelId} openSettingModal={openModal} />
          <Chat channelId={channelId} userId={user.userId} />
          {data.isMaster && (
          <SettingModal
            channelId={channelId}
            isModalOpened={isModalOpened}
            closeSettingModal={closeModal}
          />
          )}
        </S.Channel>
      </Entrance>
    </ChannelProvider>
  );
};

Channel.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    isAnonymous: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
};

export default Channel;
