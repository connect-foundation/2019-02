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
    // isToolBarActive,
    isPenToolActive,
  } = props;
  const [fitHeight, setFitHeight] = useState(false);
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const slideRatioList = useChannelSelector((state) => state.slideRatioList);
  const slideRatio = slideRatioList[page];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = { x: 0, y: 0 };
    const setPosition = (event) => {
      pos.x = event.clientX;
      pos.y = event.clientY;
    };
    const draw = (event) => {
      if (event.buttons !== 1) return;

      ctx.beginPath();

      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#c0392b';

      ctx.moveTo(pos.x, pos.y); // from
      setPosition(event);
      ctx.lineTo(pos.x, pos.y); // to

      ctx.stroke();
    };
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', setPosition);
  }, []);

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
