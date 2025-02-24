import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import {
  useChannelSelector,
  useSetCurrentSlide,
  useSlideChanged,
  useSyncSlide,
  useDispatch,
} from '@/hooks';
import { moveSlide, moveSlidePossible } from '@/utils/slide';
import { FullScreen } from '@/components/common';
import {
  KEYCODE_BACK,
  KEYCODE_FOWARD,
  CHANNEL_REDUCER_SET_ISSYNC,
  CHANNEL_REDUCER_SET_PAGE,
} from '@/constants';
import Indicator from './Indicator';
import MainSlide from './MainSlide';
import PageNumber from './PageNumber';

const SlideViewer = (props) => {
  const { isFullScreen, setFullScreen } = props;
  const {
    channelId,
    slideUrls,
    isMaster,
    isChat,
    isSync,
    page,
  } = useChannelSelector((state) => state);
  const { mutate } = useSetCurrentSlide();
  const { currentSlide } = useSlideChanged(channelId);
  const dispatch = useDispatch();
  const syncSlide = useSyncSlide({
    isMaster,
    isSync,
    page,
    currentSlide,
  });
  const directionKey = {};

  directionKey[KEYCODE_BACK] = false;
  directionKey[KEYCODE_FOWARD] = true;

  const setPage = (next) => {
    dispatch({ type: CHANNEL_REDUCER_SET_PAGE, payload: { page: next } });
  };
  const handleSetPage = (direction) => () => {
    const syncIndex = !isMaster && isSync ? currentSlide : page;

    if (!moveSlidePossible(direction, syncIndex, slideUrls.length)) return;
    if (!isMaster && isSync) {
      dispatch({ type: CHANNEL_REDUCER_SET_ISSYNC, payload: { isSync: false } });
      moveSlide(currentSlide, direction, setPage);
    } else {
      moveSlide(page, direction, setPage);
    }
  };
  const handleKeyDown = useCallback((event) => {
    if (isChat) return;
    const key = event.keyCode;
    if (Object.keys(directionKey).includes(key.toString())) {
      handleSetPage(directionKey[key])();
    }
  }, [page, isChat]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (!isMaster) return;
    mutate({ variables: { channelId, currentSlide: page } });
  }, [page]);

  useCallback(() => {
    if (!isMaster) return;
    dispatch({ type: CHANNEL_REDUCER_SET_ISSYNC, payload: { isSync: false } });
  }, []);

  const handleScreenOnChange = (event) => {
    setFullScreen(event);
    window.dispatchEvent(new Event('resize'));
  };
  const IndicatorRender = Object.values(directionKey).map((direction) => (
    <Indicator
      key={direction}
      direction={direction}
      handleSetPage={handleSetPage}
    />
  ));

  return (
    <>
      <S.SlideViewer>
        <FullScreen
          enabled={isFullScreen}
          onChange={handleScreenOnChange}
        >
          <MainSlide currentIndex={syncSlide} />
          {IndicatorRender}
        </FullScreen>
        <PageNumber
          currentSlide={syncSlide + 1}
          slideLength={slideUrls.length}
        />
      </S.SlideViewer>
    </>
  );
};

SlideViewer.propTypes = {
  isFullScreen: PropTypes.bool.isRequired,
  setFullScreen: PropTypes.func.isRequired,
};

export default SlideViewer;
