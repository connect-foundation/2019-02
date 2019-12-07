import React from 'react';
import Popover from '@material-ui/core/Popover';
import { SmallButton } from '@/components/common';
import Factory from '../FlyingEmojiFactory';
import S from './style';

const FlyingEmojiButton = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  let particles = [];
  const update = () => {
    particles = particles.filter((p) => p.move());
    requestAnimationFrame(update.bind(this));
  };
  const sendEmoji = (type) => {
    particles.push(
      new Factory(type, {
        x: (screen.width / 2),
        y: screen.height,
      }, (1 + Math.random() * 3)),
    );
    update();
  };

  return (
    <>
      <SmallButton
        onClick={handleClick}
      >
        <span aria-label="flying-emoji-button" role="img">👩🏻‍🎨</span>
        <span>감정표현</span>
      </SmallButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <S.EmojiButton onClick={sendEmoji('❤️')}>
          <span aria-label="like" role="img">❤️</span>
        </S.EmojiButton>
        <S.EmojiButton onClick={sendEmoji('🤭')}>
          <span aria-label="shame" role="img">🤭</span>
        </S.EmojiButton>
        <S.EmojiButton onClick={sendEmoji('🤔')}>
          <span aria-label="wondering" role="img">🤔</span>
        </S.EmojiButton>
        <S.EmojiButton onClick={sendEmoji('😥')}>
          <span aria-label="cry" role="img">😥</span>
        </S.EmojiButton>
        <S.EmojiButton onClick={sendEmoji('🐤')}>
          <span aria-label="dropy" role="img">🐤</span>
        </S.EmojiButton>
      </Popover>
    </>
  );
};

export default FlyingEmojiButton;
