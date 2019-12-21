import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import { useChannelSelector } from '@/hooks';
import { throttle } from '@/utils/optimize';
import { pxToNum } from '@/utils/dom';
import SlideCanvas from './SlideCanvas';
import { THROTTLETIME } from '@/constants';

const MainSlide = (props) => {
  const { currentIndex } = props;
  const {
    slideRatioList,
    isToolBarActive,
    slideCanvas,
    slideUrls,
  } = useChannelSelector((state) => state);
  const [canvasSize, setCanvasSize] = useState({
    canvasWidth: 0,
    canvasHeight: 0,
  });
  const slideRatio = slideRatioList[currentIndex];
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const resizeSlide = (fitHeight) => {
    const { current } = imageRef;

    current.style.width = fitHeight ? 'auto' : '100%';
    current.style.height = fitHeight ? '100%' : 'auto';
    current.src = slideUrls[currentIndex];
  };
  const resizeCanvas = (fitHeight, wrapperWidth, wrapperHeight) => {
    const canvasWidth = fitHeight ? wrapperHeight * slideRatio : wrapperWidth;
    const canvasHeight = fitHeight ? wrapperHeight : wrapperWidth / slideRatio;

    setCanvasSize({ canvasWidth, canvasHeight });
  };

  useEffect(() => {
    const wrapperEl = wrapperRef.current;
    const handleResize = () => {
      window.requestAnimationFrame(() => {
        const style = window.getComputedStyle(wrapperEl);
        const wrapperWidth = pxToNum(style.width);
        const wrapperHeight = pxToNum(style.height);
        const wrapperRatio = wrapperWidth / wrapperHeight;
        const fitHeight = wrapperRatio > slideRatio;

        resizeSlide(fitHeight);
        resizeCanvas(fitHeight, wrapperWidth, wrapperHeight);
      });
    };
    const throttleResize = throttle(() => handleResize(), THROTTLETIME);

    handleResize();
    window.addEventListener('resize', throttleResize);

    return () => window.removeEventListener('resize', throttleResize);
  }, [currentIndex, slideCanvas]);

  return (
    <S.MainSlide>
      <S.SlideWrapper ref={wrapperRef}>
        <S.SlideImg ref={imageRef} alt="slide" />
        {isToolBarActive && (
        <SlideCanvas
          canvasWidth={canvasSize.canvasWidth}
          canvasHeight={canvasSize.canvasHeight}
          page={currentIndex}
        />
        )}
      </S.SlideWrapper>
    </S.MainSlide>
  );
};

MainSlide.propTypes = {
  currentIndex: PropTypes.number.isRequired,
};

export default MainSlide;
