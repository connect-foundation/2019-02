import React from 'react';
import PropTypes from 'prop-types';
import S from './style';
import ChannelCard from './ChannelCard';

const ChannelListModal = (props) => {
  const { channels } = props;
  const createChannelList = () => channels.map((channel) => (
    <ChannelCard
      key={channel.channelId}
      channelId={channel.channelId}
      channelName={channel.channelName}
      channelCode={channel.channelCode}
    />
  ));

  return (
    <S.ChannelListModal>
      <S.ChannelListModalContent>
        {channels && createChannelList()}
      </S.ChannelListModalContent>
    </S.ChannelListModal>
  );
};

ChannelListModal.propTypes = {
  channels: PropTypes.arrayOf.isRequired,
};

export default ChannelListModal;
