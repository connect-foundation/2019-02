import React from 'react';
import PropTypes from 'prop-types';
import S from './style';
import { useChannelSelector } from '@/hooks';
import CodeShareButton from './CodeShareButton';
import SlideDownloadButton from './SlideDownloadButton';
import FlyingEmojiButton from './FlyingEmojiButton';

const SlideInfo = (props) => {
  const { isFullScreen } = props;
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
        <FlyingEmojiButton isFullScreen={isFullScreen} />
        <SlideDownloadButton />
        <CodeShareButton />
      </S.SlideButtonsWrapper>
    </S.SlideInfo>
  );
};

SlideInfo.propTypes = {
  isFullScreen: PropTypes.bool.isRequired,
};

export default SlideInfo;
