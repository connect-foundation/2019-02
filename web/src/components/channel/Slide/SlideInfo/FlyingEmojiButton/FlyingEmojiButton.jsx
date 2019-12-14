import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Factory from '../FlyingEmojiFactory';
import { useAddEmoji, useCreateEmoji, useChannelSelector } from '@/hooks';
import {
  FULL_SCREEN_POSITION,
  PREVENT_FLYING_EMOJI,
  GET_FLYING_EMOJI_SPEED,
  GET_EMOJI_POSITION,
  GET_EMOJI_TYPE,
  LOVE,
  LIKE,
  WONDERING,
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

    const { type } = broadcastEmoji;
    const emojiPosition = GET_EMOJI_POSITION(type);
    const emojiType = GET_EMOJI_TYPE(type);
    if (!PREVENT_FLYING_EMOJI()) return;
    const samePosition = isFullScreen
      ? FULL_SCREEN_POSITION()
      : { x: emojiPosition.x, y: emojiPosition.y };

    jobQueue.push(
      new Factory(
        emojiType,
        samePosition,
        GET_FLYING_EMOJI_SPEED(),
        isFullScreen,
      ),
    );
    startAnimation();
    setEmoji(null);
  }, [broadcastEmoji]);

  const emojiMaker = (type) => {
    mutate({ variables: { channelId, type } });
  };

  return (
    <S.EmojiSmallButton>
      <S.EmojiButton className="emoji-love" onClick={() => emojiMaker(LOVE)}>
        <span aria-label="love" role="img">❤️</span>
      </S.EmojiButton>
      <S.EmojiButton className="emoji-like" onClick={() => emojiMaker(LIKE)}>
        <span aria-label="like" role="img">👍</span>
      </S.EmojiButton>
      <S.EmojiButton className="emoji-wondering" onClick={() => emojiMaker(WONDERING)}>
        <span aria-label="wondering" role="img">🤔</span>
      </S.EmojiButton>
    </S.EmojiSmallButton>
  );
};

FlyingEmojiButton.propTypes = {
  isFullScreen: PropTypes.bool.isRequired,
};

export default FlyingEmojiButton;
