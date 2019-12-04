import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { SmallButton } from '@/components/common';
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
        <Typography>
          <S.EmojiButton>
            <span aria-label="like" role="img">❤️</span>
          </S.EmojiButton>
          <S.EmojiButton>
            <span aria-label="shame" role="img">🤭</span>
          </S.EmojiButton>
          <S.EmojiButton>
            <span aria-label="wondering" role="img">🤔</span>
          </S.EmojiButton>
          <S.EmojiButton>
            <span aria-label="cry" role="img">😥</span>
          </S.EmojiButton>
          <S.EmojiButton>
            <span aria-label="dropy" role="img">🐤</span>
          </S.EmojiButton>
        </Typography>
      </Popover>
    </>
  );
};

export default FlyingEmojiButton;
