import React from 'react';
import { SmallButton } from '@/components/common';
import { useGetChannel } from '@/hooks';


const SlideDownloadButton = () => {
  const channelInfo = useGetChannel();
  return (
    <>
      <SmallButton>
        <span aria-label="slide-code-share-button" role="img">💾</span>
        <span>다운로드</span>
      </SmallButton>
    </>
  );
};

export default SlideDownloadButton;
