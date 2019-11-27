import React from 'react';
import S from './style';
import SlideStatus from './SlideStatus';
import SlideViewer from './SlideViewer';
import SlideInfo from './SlideInfo';

const Slide = () => (
  <S.SlideWrapper>
    <SlideStatus />
    <SlideViewer />
    <SlideInfo />
  </S.SlideWrapper>
);

export default Slide;
