import React, { useState } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useChannelSelector } from '@/hooks';
import { copyToClipboard } from '@/utils/dom';
import S from './style';

const CodeShareButton = () => {
  const [toolTipOpen, setToolTipOpen] = useState(false);
  const channelCode = useChannelSelector((state) => state.channelCode);
  const handleTooltipClose = () => {
    setToolTipOpen(false);
  };
  const handleTooltipOpen = () => {
    setToolTipOpen(true);
    copyToClipboard(channelCode);
    setTimeout(() => {
      setToolTipOpen(false);
    }, 3000);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{ disablePortal: true }}
        onClose={handleTooltipClose}
        open={toolTipOpen}
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
