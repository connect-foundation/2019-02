import React, { useState, useEffect } from 'react';
import { useGetCanvasHistory, useChannelSelector } from '@/hooks';
import DropyCanvas from '@/utils/DropyCanvas';

const withInit = (WrappedComponent) => (props) => {
  const { canvasWidth, canvasHeight, page } = props;
  const { channelId } = useChannelSelector((state) => state);
  const { query, data, loading } = useGetCanvasHistory(true);
  const [slideCanvas, setSlideCanvas] = useState(null);
  const initSlideCanvas = () => {
    if (slideCanvas.getContext()) slideCanvas.clearCanvas();
  };

  useEffect(() => {
    query({ variables: { channelId, page } });
    if (slideCanvas) initSlideCanvas();
    const dropyCanvas = new DropyCanvas(canvasWidth, canvasHeight, page);

    dropyCanvas.init();
    dropyCanvas.setSize(canvasWidth, canvasHeight);
    setSlideCanvas(dropyCanvas);
  }, [page]);

  const initialData = {
    canvasHistory: data,
    loading,
    channelId,
    slideCanvas,
    initSlideCanvas,
    canvasWidth,
    canvasHeight,
    page,
  };

  return <WrappedComponent initialData={initialData} />;
};

export default withInit;
