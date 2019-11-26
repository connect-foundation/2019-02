import React from 'react';
import S from './style';
import SlideStatus from './SlideStatus';
import SlideView from './SlideView';
import SlideInfo from './SlideInfo';

const Slide = () => (
  <S.SlideWrapper>
    <SlideStatus />
    <SlideView />
    <SlideInfo />
  </S.SlideWrapper>
);

export default Slide;
