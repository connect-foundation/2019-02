import React, { useState } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import SlideStatus from './SlideStatus';
import SlideViewer from './SlideViewer';
import SlideInfo from './SlideInfo';

const Slide = (props) => {
  const { toolBarDispatch } = props;
  const [isFullScreen, setFullScreen] = useState(false);

  return (
    <S.Slide>
      <SlideStatus
        setFullScreen={setFullScreen}
        toolBarDispatch={toolBarDispatch}
      />
      <SlideViewer
        isFullScreen={isFullScreen}
        setFullScreen={setFullScreen}
      />
      <SlideInfo />
    </S.Slide>
  );
};

Slide.propTypes = {
  toolBarDispatch: PropTypes.func.isRequired,
};

export default Slide;
