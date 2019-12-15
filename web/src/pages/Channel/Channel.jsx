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
  ToolBar,
  SettingModal,
} from '@/components/channel';
import {
  LoadingModal,
  ErrorModal,
} from '@/components/common';
import S from './style';
import { NO_EXIST_CHANNEL_MESSAGE, ENTERING_CHANNEL_MESSAGGGE } from '@/constants';

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

  return (
    <ChannelProvider
      value={{
        channelId,
        isMaster: data.isMaster,
        fileUrl: data.channel.fileUrl,
        slideUrls: data.channel.slideUrls,
        slideRatioList: data.channel.slideRatioList,
        initialSlide: data.channel.currentSlide,
        masterName: data.channel.master.displayName,
        channelCode: data.channel.channelCode,
        channelName: data.channel.channelOptions.channelName,
        anonymousChat: data.channel.channelOptions.anonymousChat,
        emojiEffect: data.channel.channelOptions.emojiEffect,
      }}
    >
      <S.Channel>
        {data.isMaster && (
          <ToolBar />
        )}
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
