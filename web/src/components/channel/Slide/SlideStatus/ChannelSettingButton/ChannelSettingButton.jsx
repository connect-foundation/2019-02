import React from 'react';
import PropTypes from 'prop-types';
import { SmallButton } from '@/components/common';

const ChannelSettingButton = (props) => {
  const { openSettingModal } = props;

  return (
    <SmallButton onClick={openSettingModal}>
      <span aria-label="sync" role="img">⚙️</span>
      채널설정
    </SmallButton>
  );
};

ChannelSettingButton.propTypes = {
  openSettingModal: PropTypes.func.isRequired,
};

export default ChannelSettingButton;
