import React from 'react';
import {
  useChannelSelector,
  useSlideChanged,
  useDispatch,
} from '@/hooks';
import { SmallButton } from '@/components/common';
import { CHANNEL_REDUCER_SET_PAGE, CHANNEL_REDUCER_SET_ISSYNC } from '@/constants';

const SlideSyncButton = () => {
  const { channelId, isSync } = useChannelSelector((state) => state);
  const { currentSlide } = useSlideChanged(channelId);
  const dispatch = useDispatch();
  const handleSync = (state) => () => {
    dispatch({ type: CHANNEL_REDUCER_SET_PAGE, payload: { page: currentSlide } });
    dispatch({ type: CHANNEL_REDUCER_SET_ISSYNC, payload: { isSync: state } });
  };
  const color = isSync ? 'secondary' : 'inherit';

  return (
    <SmallButton
      color={color}
      onClick={handleSync(!isSync)}
    >
      <span aria-label="sync" role="img">⚡️</span>
      스피커 동기화
    </SmallButton>
  );
};

export default SlideSyncButton;
