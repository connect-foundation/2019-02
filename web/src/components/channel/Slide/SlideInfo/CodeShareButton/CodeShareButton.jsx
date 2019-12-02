import React from 'react';
import { SmallButton } from '@/components/common';
import { useChannelSelector } from '@/hooks';

const CodeShareButton = () => {
  const channelCode = useChannelSelector((state) => state.channelCode);
  const handleCodeShareButtonOnClick = () => {
    const element = document.createElement('textarea');
    element.value = channelCode;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
  };

  return (
    <SmallButton onClick={handleCodeShareButtonOnClick}>
      <span aria-label="slide-code-share-button" role="img">📎</span>
      <span>채널 공유</span>
    </SmallButton>
  );
};

export default CodeShareButton;
