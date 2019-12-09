import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useChannelSelector } from '@/hooks';
import { copyToClipboard } from '@/utils/dom';
import S from './style';

const CodeShareButton = () => {
  const [open, setOpen] = useState(false);
  const channelCode = useChannelSelector((state) => state.channelCode);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
    copyToClipboard(channelCode);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title="채널코드 복사완료"
      >
        <S.SmallButton
          onClick={handleTooltipOpen}
          variant="contained"
        >
          <span aria-label="slide-code-share-button" role="img">📎</span>
          <span>채널 공유</span>
        </S.SmallButton>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default CodeShareButton;
