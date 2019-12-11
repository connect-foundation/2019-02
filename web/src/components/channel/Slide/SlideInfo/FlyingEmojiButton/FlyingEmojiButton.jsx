import React, { useState, useEffect } from 'react';
import Factory from '../FlyingEmojiFactory';
import S from './style';

const FlyingEmojiButton = () => {
  const [state, setState] = useState(null);
  const [position, setPosition] = useState({ x: null, y: null });
  let jobQueue = [];
  let requestId = null;
  const isAchieve = () => jobQueue.length === 0 && requestId !== null;
  const startAnimation = () => {
    jobQueue = jobQueue.filter((job) => job.flying());
    if (isAchieve()) {
      cancelAnimationFrame(requestId);
      return;
    }
    requestId = requestAnimationFrame(startAnimation.bind(this));
  };
  useEffect(() => {
    if (!state) return;
    console.log(position);
    jobQueue.push(
      new Factory(state, position, (1 + Math.random() * 5)),
    );
    setState(null);
    startAnimation();
  }, [state]);

  const emojiMaker = (e, type) => {
    const body = document.querySelector('body');
    setPosition({ x: e.clientX, y: body.offsetHeight - e.clientY });
    setState(type);
  };

  return (
    <S.EmojiSmallButton>
      <S.EmojiButton onClick={(e) => emojiMaker(e, '❤️')}>
        <span aria-label="like" role="img">❤️</span>
      </S.EmojiButton>
      <S.EmojiButton onClick={(e) => emojiMaker(e, '🤭')}>
        <span aria-label="shame" role="img">🤭</span>
      </S.EmojiButton>
      <S.EmojiButton onClick={(e) => emojiMaker(e, '🤔')}>
        <span aria-label="wondering" role="img">🤔</span>
      </S.EmojiButton>
      <S.EmojiButton onClick={(e) => emojiMaker(e, '😥')}>
        <span aria-label="cry" role="img">😥</span>
      </S.EmojiButton>
      <S.EmojiButton onClick={(e) => emojiMaker(e, '🐤')}>
        <span aria-label="dropy" role="img">🐤</span>
      </S.EmojiButton>
    </S.EmojiSmallButton>
  );
};

export default FlyingEmojiButton;
