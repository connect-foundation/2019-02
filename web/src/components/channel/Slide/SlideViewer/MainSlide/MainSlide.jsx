import React, {
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import S from './style';
import { useChannelSelector } from '@/hooks';
import { pxToNum } from '@/utils/dom';

const MainSlide = (props) => {
  const { page, slideUrls } = props;
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const slideRatioList = useChannelSelector((state) => state.slideRatioList);
  const slideRatio = slideRatioList[page];
  const resizeSlide = (fitHeight) => {
    const { current } = imageRef;

    current.style.width = fitHeight ? 'auto' : '100%';
    current.style.height = fitHeight ? '100%' : 'auto';
    current.src = slideUrls[page];
    window.requestAnimationFrame(() => {
      current.style.visibility = 'visible';
    });
  };
  const resizeCanvas = (fitHeight, width, height) => {
    const canvasWidth = fitHeight ? height * slideRatio : width;
    const canvasHeight = fitHeight ? height : width / slideRatio;

    canvasRef.current.style.width = `${canvasWidth}px`;
    canvasRef.current.style.height = `${canvasHeight}px`;
  };

  useEffect(() => {
    const wrapperEl = wrapperRef.current;
    const applyImageRatio = () => {
      window.requestAnimationFrame(() => {
        const style = window.getComputedStyle(wrapperEl);
        const width = pxToNum(style.width);
        const height = pxToNum(style.height);
        const wrapperRatio = width / height;
        const fitHeight = wrapperRatio > slideRatio;

        resizeSlide(fitHeight);
        resizeCanvas(fitHeight, width, height);
      });
    };
    const handleResize = () => applyImageRatio();

    imageRef.current.style.visibility = 'hidden';
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
        <S.Canvas ref={canvasRef} />
      </S.SlideWrapper>
    </S.MainSlide>
  );
};

MainSlide.propTypes = {
  page: PropTypes.number.isRequired,
  slideUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MainSlide;
