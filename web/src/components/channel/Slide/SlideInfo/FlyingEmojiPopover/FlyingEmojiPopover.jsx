import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Factory from '../FlyingEmojiFactory';

import S from './style';

const FlyingEmojiPopover = (props) => {
  const { handleClose } = props;
  const [state, setState] = useState(null);
  let jobQueue = [];
  let requestId = null;
  const startAnimation = () => {
    jobQueue = jobQueue.filter((job) => job.flying());
    if (jobQueue.length === 0 && requestId !== null) {
      cancelAnimationFrame(requestId);
      return;
    }
    requestId = requestAnimationFrame(startAnimation.bind(this));
  };
  useEffect(() => {
    if (!state) return;
    const body = document.querySelector('body');
    jobQueue.push(
      new Factory(state, {
        x: (body.offsetWidth / 2),
        y: 0,
      }, (1 + Math.random() * 3)),
    );
    startAnimation();
  }, [state]);

  return (
    <>
      <S.EmojiButton onClick={() => setState('❤️')}>
        <span aria-label="like" role="img">❤️</span>
      </S.EmojiButton>
      <S.EmojiButton onClick={() => setState('🤭')} handleClose={handleClose}>
        <span aria-label="shame" role="img">🤭</span>
      </S.EmojiButton>
      <S.EmojiButton onClick={() => setState('🤔')}>
        <span aria-label="wondering" role="img">🤔</span>
      </S.EmojiButton>
      <S.EmojiButton onClick={() => setState('😥')}>
        <span aria-label="cry" role="img">😥</span>
      </S.EmojiButton>
      <S.EmojiButton onClick={() => setState('🐤')}>
        <span aria-label="dropy" role="img">🐤</span>
      </S.EmojiButton>
    </>
  );
};

FlyingEmojiPopover.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default FlyingEmojiPopover;
