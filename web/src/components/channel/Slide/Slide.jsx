import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSlideChanged } from '@/hooks';
import S from './style';
import SlideStatus from './SlideStatus';
import SlideViewer from './SlideViewer';
import SlideInfo from './SlideInfo';

const Slide = (props) => {
  const { channelId } = props;
  const { currentSlide } = useSlideChanged(channelId);
  const [isSync, setSync] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);
  const [page, setPage] = useState(0);
  const handleSync = (state) => () => {
    setPage(currentSlide);
    setSync(state);
  };

  return (
    <S.Slide>
      <SlideStatus
        isSync={isSync}
        handleSync={handleSync}
        setFullScreen={setFullScreen}
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
      <SlideInfo />
    </S.Slide>
  );
};

Slide.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default Slide;
