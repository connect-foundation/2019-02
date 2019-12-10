import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  useSlideChanged,
  useEnteredListener,
  useLeaveListener,
  useChannelSelector,
} from '@/hooks';
import S from './style';
import SlideStatus from './SlideStatus';
import SlideViewer from './SlideViewer';
import SlideInfo from './SlideInfo';
import { useBeforeunload } from '@/components/common/BeforeUnload';

const Slide = (props) => {
  const { channelId, toolBarDispatch } = props;
  const { currentSlide } = useSlideChanged(channelId);
  const [isSync, setSync] = useState(true);
  const [checkListener, setCheckListener] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);
  const [page, setPage] = useState(0);
  const listenerList = useChannelSelector((state) => state.listenerList);
  const enteredListener = useEnteredListener(channelId);
  const leaveListener = useLeaveListener(channelId);
  const handleSync = (state) => () => {
    setPage(currentSlide);
    setSync(state);
  };
  if (checkListener) {
    enteredListener.mutate({
      variables: {
        channelId,
        listenerList,
      },
    });
    setCheckListener(false);
  }
  useBeforeunload(() => {
    leaveListener.mutate({
      variables: {
        channelId,
        listenerList,
      },
    });
  });

  return (
    <S.Slide>
      <SlideStatus
        isSync={isSync}
        handleSync={handleSync}
        setFullScreen={setFullScreen}
        toolBarDispatch={toolBarDispatch}
      />
      <SlideViewer
        isSync={isSync}
        setSync={setSync}
        isFullScreen={isFullScreen}
        setFullScreen={setFullScreen}
        page={page}
        setPage={setPage}
        channelId={channelId}
      />
      <SlideInfo listenerList={listenerList.length} />
    </S.Slide>
  );
};

Slide.propTypes = {
  channelId: PropTypes.string.isRequired,
  toolBarDispatch: PropTypes.func.isRequired,
};

export default Slide;
