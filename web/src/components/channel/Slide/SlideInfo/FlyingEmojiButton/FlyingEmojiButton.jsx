import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import { SmallButton } from '@/components/common';
import FlyingEmojiPopover from '../FlyingEmojiPopover';

const FlyingEmojiButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
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
        <FlyingEmojiPopover handleClose={handleClose} />
      </Popover>
    </>
  );
};

export default FlyingEmojiButton;
