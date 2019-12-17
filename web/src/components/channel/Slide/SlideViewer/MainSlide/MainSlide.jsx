import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import { useChannelSelector } from '@/hooks';
import { pxToNum } from '@/utils/dom';
import SlideCanvas from './SlideCanvas';

const MainSlide = (props) => {
  const { page, slideUrls } = props;
  const [canvasSize, setCanvasSize] = useState({
    canvasWidth: 0,
    canvasHeight: 0,
  });
  const { slideRatioList, dropyCanvas } = useChannelSelector((state) => state);
  const slideRatio = slideRatioList[page];
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const resizeSlide = (fitHeight) => {
    const { current } = imageRef;

    current.style.width = fitHeight ? 'auto' : '100%';
    current.style.height = fitHeight ? '100%' : 'auto';
    current.src = slideUrls[page];
  };
  const resizeCanvas = (fitHeight, wrapperWidth, wrapperHeight) => {
    const canvasWidth = fitHeight ? wrapperHeight * slideRatio : wrapperWidth;
    const canvasHeight = fitHeight ? wrapperHeight : wrapperWidth / slideRatio;

    dropyCanvas.setSize(canvasWidth, canvasHeight);
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

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [page]);

  return (
    <S.MainSlide>
      <S.SlideWrapper ref={wrapperRef}>
        <S.SlideImg ref={imageRef} alt="slide" />
        <SlideCanvas
          canvasWidth={canvasSize.canvasWidth}
          canvasHeight={canvasSize.canvasHeight}
        />
      </S.SlideWrapper>
    </S.MainSlide>
  );
};

MainSlide.propTypes = {
  page: PropTypes.number.isRequired,
  slideUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MainSlide;
