import React from 'react';
import PropTypes from 'prop-types';
import S from './style';
import { useChannelSelector, useChannelNameChanged } from '@/hooks';
import CodeShareButton from './CodeShareButton';
import SlideDownloadButton from './SlideDownloadButton';
import FlyingEmojiButton from './FlyingEmojiButton';

const SlideInfo = (props) => {
  const { isFullScreen } = props;
  const channelId = useChannelSelector((state) => state.channelId);
  const masterName = useChannelSelector((state) => state.masterName);
  const { channelName } = useChannelNameChanged(channelId);

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
