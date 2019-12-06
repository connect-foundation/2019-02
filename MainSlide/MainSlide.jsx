import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import S from './style';
import { useChannelSelector } from '@/hooks';
import { pxToNum } from '@/utils/dom';

const MainSlide = (props) => {
  const {
    page,
    slideUrls,
    isPenToolActive,
  } = props;
  const [fitHeight, setFitHeight] = useState(false);
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const slideRatioList = useChannelSelector((state) => state.slideRatioList);
  const slideRatio = slideRatioList[page];

  useEffect(() => {
    const wrapperEl = wrapperRef.current;
    const applyImageRatio = async () => window.requestAnimationFrame(() => {
      const style = window.getComputedStyle(wrapperEl);
      const width = pxToNum(style.width);
      const height = pxToNum(style.height);
      const wrapperRatio = width / height;
      const fitHeightImage = wrapperRatio > slideRatio;
      const canvasWidth = fitHeightImage ? height * slideRatio : width;
      const canvasHeight = fitHeightImage ? height : width / slideRatio;

      canvasRef.current.style.width = `${canvasWidth}px`;
      canvasRef.current.style.height = `${canvasHeight}px`;
      setFitHeight(fitHeightImage);
    });
    const handleResize = () => applyImageRatio();

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [page]);

  return (
    <S.MainSlide>
      <S.SlideWrapper ref={wrapperRef}>
        <S.SlideImg alt="slide" src={slideUrls[page]} fitHeight={fitHeight} />
        <S.Canvas ref={canvasRef} />
      </S.SlideWrapper>
    </S.MainSlide>
  );
};

MainSlide.propTypes = {
  page: PropTypes.number.isRequired,
  slideUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPenToolActive: PropTypes.bool.isRequired,
};

export default MainSlide;
