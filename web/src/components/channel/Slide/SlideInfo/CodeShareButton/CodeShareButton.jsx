import React from 'react';
import { SmallButton } from '@/components/common';
import { useChannelSelector } from '@/hooks';
import { copyToClipboard } from '@/utils/dom';

const CodeShareButton = () => {
  const channelCode = useChannelSelector((state) => state.channelCode);
  const handleCodeShareButtonOnClick = () => {
    copyToClipboard(channelCode);
  };

  return (
    <SmallButton onClick={handleCodeShareButtonOnClick}>
      <span aria-label="slide-code-share-button" role="img">📎</span>
      <span>채널 공유</span>
    </SmallButton>
  );
};

export default CodeShareButton;
