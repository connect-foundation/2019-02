import React from 'react';
import { SmallButton } from '@/components/common';
import { useChannelSelector } from '@/hooks';


const SlideDownloadButton = () => {
  const channelFileUrl = useChannelSelector((state) => state.fileUrl);

  return (
    <SmallButton>
      <a href={channelFileUrl}>
        <span aria-label="slide-download-button" role="img">💾</span>
        <span>다운로드</span>
      </a>
    </SmallButton>
  );
};

export default SlideDownloadButton;
