import React from 'react';
import S from './style';
import SlideStatus from './SlideStatus';
import SlideViewer from './SlideViewer';
import SlideInfo from './SlideInfo';

const Slide = () => (
  <S.Slide>
    <SlideStatus />
    <SlideViewer />
    <SlideInfo />
  </S.Slide>
);

export default Slide;
