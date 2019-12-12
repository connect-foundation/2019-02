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
} from '@/components/channel';
import S from './style';
import { NO_EXIST_CHANNEL_MESSAGE, ENTERING_CHANNEL_MESSAGGGE } from '@/constants';
import { LoadingModal, ErrorModal, SettingModal } from '@/components/common';

const Channel = (props) => {
  const { user } = props;
  const { params: { channelId } } = useRouteMatch();
  const { data, loading } = useGetChannel(channelId);
  const { mutate } = useAddUserHistory();
  const { isModalOpened, openModal, closeModal } = useModal();

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
        channelName: data.channel.channelName,
        masterName: data.channel.master.displayName,
        channelCode: data.channel.channelCode,
      }}
    >
      <S.Channel>
        {data.isMaster && (
          <ToolBar />
        )}
        <Slide channelId={channelId} openSettingModal={openModal} />
        <Chat channelId={channelId} userId={user.userId} />
        {(data.isMaster && isModalOpened) && (
          <SettingModal channelId={channelId} closeSettingModal={closeModal} />
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
