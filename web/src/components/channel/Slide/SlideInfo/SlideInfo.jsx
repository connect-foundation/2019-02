import React from 'react';
import PropTypes from 'prop-types';
import S from './style';
import {
  useChannelSelector,
  useChannelNameChanged,
  useEmojiChanged,
} from '@/hooks';
import CodeShareButton from './CodeShareButton';
import SlideDownloadButton from './SlideDownloadButton';
import FlyingEmojiButton from './FlyingEmojiButton';

const SlideInfo = (props) => {
  const { isFullScreen } = props;
  const { channelId, masterName } = useChannelSelector((state) => state);
  const { channelName } = useChannelNameChanged(channelId);
  const { emojiEffect } = useEmojiChanged(channelId);

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
        {emojiEffect && <FlyingEmojiButton isFullScreen={isFullScreen} />}
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
