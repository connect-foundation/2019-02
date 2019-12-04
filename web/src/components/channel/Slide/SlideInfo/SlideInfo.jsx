import React from 'react';
import S from './style';
import { useChannelSelector } from '@/hooks';
import CodeShareButton from './CodeShareButton';
import SlideDownloadButton from './SlideDownloadButton';
import FlyingEmojiButton from './FlyingEmojiButton';

const SlideInfo = () => {
  const channelName = useChannelSelector((state) => state.channelName);
  const masterName = useChannelSelector((state) => state.masterName);

  return (
    <S.SlideInfo>
      <S.TitleWrapper>
        <S.ChannelTitle>{channelName}</S.ChannelTitle>
        <S.MasterName>
          <span>| &nbsp;&nbsp;</span>
          {masterName}
        </S.MasterName>
      </S.TitleWrapper>
      <S.SlideButtonsWrapper>
        <SlideDownloadButton />
        <CodeShareButton />
        <FlyingEmojiButton />
      </S.SlideButtonsWrapper>
    </S.SlideInfo>
  );
};

export default SlideInfo;
