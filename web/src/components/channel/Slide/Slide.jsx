import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useChannelSelector, useSlideChanged, useDispatch } from '@/hooks';
import S from './style';
import SlideStatus from './SlideStatus';
import SlideViewer from './SlideViewer';
import SlideInfo from './SlideInfo';

const Slide = (props) => {
  const { channelId, toolBarDispatch } = props;
  const { currentSlide } = useSlideChanged(channelId);
  const isSync = useChannelSelector((state) => state.isSync);
  const [isFullScreen, setFullScreen] = useState(false);
  const dispatch = useDispatch();
  const handleSync = (state) => () => {
    dispatch({ type: 'SET_PAGE', payload: { page: currentSlide } });
    dispatch({ type: 'SET_ISSYNC', payload: { isSync: state } });
  };

  return (
    <S.Slide>
      <SlideStatus
        isSync={isSync}
        handleSync={handleSync}
        setFullScreen={setFullScreen}
        toolBarDispatch={toolBarDispatch}
      />
      <SlideViewer
        isFullScreen={isFullScreen}
        setFullScreen={setFullScreen}
        channelId={channelId}
      />
      <SlideInfo />
    </S.Slide>
  );
};

Slide.propTypes = {
  channelId: PropTypes.string.isRequired,
  toolBarDispatch: PropTypes.func.isRequired,
};

export default Slide;
