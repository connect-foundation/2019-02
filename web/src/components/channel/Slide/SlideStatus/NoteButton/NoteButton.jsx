import React from 'react';
import { SmallButton } from '@/components/common';
import { useDispatch, useChannelSelector } from '@/hooks';

const NoteButton = () => {
  const dispatch = useDispatch();
  const { isToolBarActive } = useChannelSelector((state) => state);
  const handleOnClick = () => {
    window.dispatchEvent(new Event('resize'));

    if (isToolBarActive) {
      dispatch({ type: 'TOOLBAR_INACTIVE' });
    } else {
      dispatch({ type: 'TOOLBAR_ACTIVE' });
    }
  };

  return (
    <SmallButton onClick={handleOnClick}>
      <span aria-label="pencil" role="img">✏️</span>
      <span>필기도구</span>
    </SmallButton>
  );
};

export default NoteButton;
