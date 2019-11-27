import React, { useState } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import SlideStatus from './SlideStatus';
import SlideViewer from './SlideViewer';
import SlideInfo from './SlideInfo';

const Slide = (props) => {
  const { channelId } = props;
  const [isSync, setSync] = useState(true);
  const handleSync = () => setSync(!isSync);

  return (
    <S.Slide>
      <SlideStatus
        isSync={isSync}
        handleSync={handleSync}
      />
      <SlideViewer
        isSync={isSync}
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
