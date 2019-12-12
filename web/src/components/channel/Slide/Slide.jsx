import React, { useState } from 'react';
import S from './style';
import SlideStatus from './SlideStatus';
import SlideViewer from './SlideViewer';
import SlideInfo from './SlideInfo';

const Slide = (props) => {
  const [isFullScreen, setFullScreen] = useState(false);

  return (
    <S.Slide>
      <SlideStatus
        setFullScreen={setFullScreen}
      />
      <SlideViewer
        isFullScreen={isFullScreen}
        setFullScreen={setFullScreen}
      />
      <SlideInfo />
    </S.Slide>
  );
};

export default Slide;
