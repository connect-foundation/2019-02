import React from 'react';
import { useChannelSelector } from '@/hooks';
import S from './style';
import Indicator from './Indicator';
import MainSlide from './MainSlide';

const SlideView = () => {
  const slideUrls = useChannelSelector((state) => state.slideUrls);
  return (
    <S.Wrapper>
      <MainSlide />
      {slideUrls.map((slide) => <img alt="slide" src={slide} />)}
      <Indicator direction="back" />
      <Indicator direction="foward" />
    </S.Wrapper>
  );
};

export default SlideView;
