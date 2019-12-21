import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import {
  useChannelSelector,
  useAddCanvasHistory,
  useGetCanvasHistory,
  useDispatch,
} from '@/hooks';
import { CAHNNEL_REDUCER_SET_ERASER_INACTIVE } from '@/constants';
import DropyCanvas from '@/utils/DropyCanvas';

const SlideCanvas = (props) => {
  const { canvasWidth, canvasHeight, page } = props;
  const dispatch = useDispatch();
  const {
    channelId,
    isPenToolActive,
    isEraserToolActive,
    toolOptions,
  } = useChannelSelector((state) => state);
  const { mutate } = useAddCanvasHistory();
  const { query, data, loading } = useGetCanvasHistory(true);
  const [slideCanvas, setSlideCanvas] = useState(null);
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;
  const initSlideCanvas = () => {
    if (slideCanvas.getContext()) slideCanvas.clearCanvas();
  };

  useEffect(() => {
    query({ variables: { channelId, page, toolOptions } });
    if (slideCanvas) initSlideCanvas();
    const dropyCanvas = new DropyCanvas(canvasWidth, canvasHeight, page);

    dropyCanvas.init();
    dropyCanvas.setSize(canvasWidth, canvasHeight);
    setSlideCanvas(dropyCanvas);
  }, [page]);

  useEffect(() => {
    if (!slideCanvas) return;
    initSlideCanvas();
    dispatch({ type: CAHNNEL_REDUCER_SET_ERASER_INACTIVE });
  }, [isEraserToolActive]);

  useEffect(() => {
    if (!slideCanvas || !canvas) return;
    if (isPenToolActive) {
      const saveCanvasHistoryHandler = () => {
        mutate({
          variables: {
            channelId,
            page: slideCanvas.getSlidePage(),
            history: slideCanvas.getNewLineHistory(),
            toolOptions: slideCanvas.getToolOptions(),
          },
        });
      };
      slideCanvas.setCustomMouseUpHandler(saveCanvasHistoryHandler);
      slideCanvas.setCustomMouseLeaveHandler(saveCanvasHistoryHandler);
      slideCanvas.addEventListener(canvas);
    }

    return () => slideCanvas.removeEventListener(canvas);
  }, [page, slideCanvas, canvas, isPenToolActive]);

  useEffect(() => {
    if (loading || !canvas) return;
    const context = canvas.getContext('2d');

    slideCanvas.setContext(context);
    slideCanvas.setHistory(data.history);
    slideCanvas.reDrawContent();
  }, [loading]);

  useEffect(() => {
    if (canvas === null) return;
    const context = canvas.getContext('2d');

    slideCanvas.setSize(canvasWidth, canvasHeight);
    slideCanvas.setContext(context);
    slideCanvas.reDrawContent();
  }, [canvasWidth, canvasHeight]);

  return (
    <S.CanvasWrapper isPenToolActive={isPenToolActive}>
      {slideCanvas && slideCanvas.render(
        canvasRef,
        canvasWidth,
        canvasHeight,
      )}
    </S.CanvasWrapper>
  );
};

SlideCanvas.propTypes = {
  canvasWidth: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

export default SlideCanvas;
