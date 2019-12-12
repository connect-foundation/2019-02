import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Factory from '../FlyingEmojiFactory';
import { useAddEmoji, useCreateEmoji, useChannelSelector } from '@/hooks';
import {
  FULL_SCREEN_POSITION,
  NORMAL_SCREEN_POSITION,
  GET_FLYING_EMOJI_SPEED,
} from '@/constants';
import S from './style';

const FlyingEmojiButton = (props) => {
  const channelId = useChannelSelector((state) => state.channelId);
  const { isFullScreen } = props;
  let jobQueue = [];
  let requestId = null;

  const broadcastEmoji = useCreateEmoji(channelId);
  const { mutate } = useAddEmoji();
  const [emoji, setEmoji] = useState(null);
  const isBroadcastData = () => broadcastEmoji !== undefined && emoji === null;
  const isReadyBroadcastData = () => emoji === null || broadcastEmoji === undefined;
  const isAchieve = () => jobQueue.length === 0 && requestId !== null;
  if (isBroadcastData()) setEmoji(broadcastEmoji.type);

  const startAnimation = () => {
    jobQueue = jobQueue.filter((job) => job.flying());
    if (isAchieve()) {
      cancelAnimationFrame(requestId);
      return;
    }
    requestId = requestAnimationFrame(startAnimation.bind(this));
  };

  useEffect(() => {
    if (isReadyBroadcastData()) return;
    const { type, positionX, positionY } = broadcastEmoji;
    const samePosition = isFullScreen
      ? FULL_SCREEN_POSITION
      : { x: positionX, y: positionY };

    jobQueue.push(
      new Factory(
        type,
        samePosition,
        GET_FLYING_EMOJI_SPEED(),
        isFullScreen,
      ),
    );
    startAnimation();
    setEmoji(null);
  }, [broadcastEmoji]);

  const emojiMaker = (event, type) => {
    const normalPosition = NORMAL_SCREEN_POSITION(event);
    const positionX = normalPosition.x;
    const positionY = normalPosition.y;
    mutate({
      variables: {
        channelId,
        type,
        positionX,
        positionY,
      },
    });
  };

  return (
    <S.EmojiSmallButton>
      <S.EmojiButton onClick={(event) => emojiMaker(event, '❤️')}>
        <span aria-label="like" role="img">❤️</span>
      </S.EmojiButton>
      <S.EmojiButton onClick={(event) => emojiMaker(event, '👍')}>
        <span aria-label="great" role="img">👍</span>
      </S.EmojiButton>
      <S.EmojiButton onClick={(event) => emojiMaker(event, '🤔')}>
        <span aria-label="wondering" role="img">🤔</span>
      </S.EmojiButton>
    </S.EmojiSmallButton>
  );
};

FlyingEmojiButton.propTypes = {
  isFullScreen: PropTypes.bool.isRequired,
};

export default FlyingEmojiButton;
