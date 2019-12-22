import React from 'react';
import { SmallButton } from '@/components/common';
import { useDispatch, useChannelSelector } from '@/hooks';
import {
  CHANNEL_REDUCER_TOOLBAR_ACTIVE,
  CHANNEL_REDUCER_TOOLBAR_INACTIVE,
} from '@/constants';

const NoteButton = () => {
  const dispatch = useDispatch();
  const { isToolBarActive } = useChannelSelector((state) => state);
  const handleOnClick = () => {
    window.dispatchEvent(new Event('resize'));

    if (isToolBarActive) {
      dispatch({ type: CHANNEL_REDUCER_TOOLBAR_INACTIVE });
    } else {
      dispatch({ type: CHANNEL_REDUCER_TOOLBAR_ACTIVE });
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
