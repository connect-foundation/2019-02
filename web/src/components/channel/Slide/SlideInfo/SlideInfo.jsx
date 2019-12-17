import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import People from '@@/people.svg';
import S from './style';
import {
  useChannelSelector,
  useChannelNameChanged,
  useEmojiChanged,
  useListenerListChanged,
} from '@/hooks';
import CodeShareButton from './CodeShareButton';
import SlideDownloadButton from './SlideDownloadButton';
import FlyingEmojiButton from './FlyingEmojiButton';

const SlideInfo = (props) => {
  const { isFullScreen } = props;

  const channel = useChannelSelector((state) => state);
  const { listenerList } = useListenerListChanged(channel.channelId);
  const { channelName } = useChannelNameChanged(channel.channelId);
  const { emojiEffect } = useEmojiChanged(channel.channelId);
  const [listenerCount, setListenerCount] = useState(channel.listenerList.length + 1);
  useEffect(() => {
    if (listenerList.length === 0) return;
    setListenerCount(listenerList.length);
  }, [listenerList]);

  return (
    <S.SlideInfo>
      <S.ChannelSummaryWrapper>
        <S.TitleWrapper>
          <S.ChannelTitle>{channelName}</S.ChannelTitle>
          <S.MasterName>
            <span>| &nbsp;&nbsp;</span>
            {channel.masterName}
          </S.MasterName>
        </S.TitleWrapper>
        <S.PeopleWrapper>
          <S.PeopleLogo
            src={People}
            alt="people-logo"
          />
          {/* {listenerList.length} */}
          {listenerCount}
          명 참여중
        </S.PeopleWrapper>
      </S.ChannelSummaryWrapper>
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
