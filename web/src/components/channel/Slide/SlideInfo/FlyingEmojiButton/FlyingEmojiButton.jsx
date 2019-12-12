import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Factory from '../FlyingEmojiFactory';
import { useAddEmoji, useCreateEmoji } from '@/hooks';
import S from './style';

const FlyingEmojiButton = (props) => {
  const { channelId, isFullScreen } = props;
  let jobQueue = [];
  let requestId = null;

  const broadcastEmoji = useCreateEmoji(channelId);
  const { mutate } = useAddEmoji();
  const [emoji, setEmoji] = useState(null);
  const isBroadcastData = () => broadcastEmoji !== undefined && emoji === null;
  const isReadyBroadcastData = () => emoji === null || broadcastEmoji === undefined;
  const isAchieve = () => jobQueue.length === 0 && requestId !== null;
  const body = document.querySelector('body');
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
    const fullScreenPositionX = body.offsetWidth - 150;
    const getFlyingEmojiSpeed = 3 + Math.random() * 8;
    const samePosition = isFullScreen
      ? { x: fullScreenPositionX, y: 0 }
      : { x: positionX, y: positionY };
    jobQueue.push(
      new Factory(
        type,
        samePosition,
        getFlyingEmojiSpeed,
        isFullScreen,
      ),
    );
    startAnimation();
    setEmoji(null);
  }, [broadcastEmoji]);

  const emojiMaker = (e, type) => {
    const positionX = e.clientX;
    const positionY = body.offsetHeight - e.clientY;
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
      <S.EmojiButton onClick={(e) => emojiMaker(e, '❤️')}>
        <span aria-label="like" role="img">❤️</span>
      </S.EmojiButton>
      <S.EmojiButton onClick={(e) => emojiMaker(e, '👍')}>
        <span aria-label="great" role="img">👍</span>
      </S.EmojiButton>
      <S.EmojiButton onClick={(e) => emojiMaker(e, '🤔')}>
        <span aria-label="wondering" role="img">🤔</span>
      </S.EmojiButton>
    </S.EmojiSmallButton>
  );
};

FlyingEmojiButton.propTypes = {
  channelId: PropTypes.string.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
};

export default FlyingEmojiButton;
