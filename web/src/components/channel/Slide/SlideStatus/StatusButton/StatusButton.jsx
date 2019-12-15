import React from 'react';
import { SmallButton } from '@/components/common';
import { useChannelStatusChanged } from '@/hooks';
import { PRESENTATION_ON } from '@/constants';

const StatusButton = () => {
  const channelStatus = useChannelStatusChanged();
  const emoji = channelStatus === PRESENTATION_ON ? '🐥' : '🐣';
  const color = channelStatus === PRESENTATION_ON ? 'primary' : 'secondary';

  console.log(channelStatus);

  return (
    <SmallButton color={color}>
      <span aria-label="sync" role="img">{emoji}</span>
      <span>{`presentation-${channelStatus}`}</span>
    </SmallButton>
  );
};

export default StatusButton;
