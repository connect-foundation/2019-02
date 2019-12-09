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
      channelStatus={channel.channelStatus}
      masterName={channel.master.displayName}
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
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      channelCode: PropTypes.string.isRequired,
      channelId: PropTypes.string.isRequired,
      channelName: PropTypes.string.isRequired,
      channelStatus: PropTypes.string.isRequired,
      master: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};

export default ChannelListModal;
