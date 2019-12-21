import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import withCanvasInit from './withCanvasInit';
import S from './style';
import {
  useChannelSelector,
  useAddCanvasHistory,
  useDispatch,
} from '@/hooks';
import { CAHNNEL_REDUCER_SET_ERASER_INACTIVE } from '@/constants';

const SlideCanvas = ({ initialData }) => {
  const {
    canvasHistory,
    loading,
    channelId,
    slideCanvas,
    initSlideCanvas,
    canvasWidth,
    canvasHeight,
  } = initialData;
  const { isPenToolActive, isEraserToolActive } = useChannelSelector((state) => state);
  const dispatch = useDispatch();
  const { mutate } = useAddCanvasHistory();
  const canvasRef = useRef(null);
  const canvas = canvasRef.current;

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
  }, [slideCanvas, canvas, isPenToolActive]);

  useEffect(() => {
    if (loading || !canvas) return;
    const context = canvas.getContext('2d');

    slideCanvas.setContext(context);
    slideCanvas.setHistory(canvasHistory.history);
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
  initialData: PropTypes.shape({
    canvasHistory: PropTypes.shape({
      page: PropTypes.number,
      history: PropTypes.array,
      toolOptions: PropTypes.shape({
        lineWidth: PropTypes.number.isRequired,
        lineCap: PropTypes.string.isRequired,
        lineColor: PropTypes.string.isRequired,
      }),
    }),
    loading: PropTypes.bool.isRequired,
    channelId: PropTypes.string.isRequired,
    slideCanvas: PropTypes.object,
    initSlideCanvas: PropTypes.func.isRequired,
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired,
  }),
};

export default withCanvasInit(SlideCanvas);
