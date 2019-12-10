import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import {
  useChannelSelector,
  useSetCurrentSlide,
  useSlideChanged,
  useSyncSlide,
} from '@/hooks';
import { moveSlide, moveSlidePossible } from '@/utils/slide';
import { FullScreen } from '@/components/common';
import { KEYCODE_BACK, KEYCODE_FOWARD } from '@/constants';
import Indicator from './Indicator';
import MainSlide from './MainSlide';
import PageNumber from './PageNumber';


const SlideViewer = (props) => {
  const {
    channelId,
    isSync,
    setSync,
    page,
    setPage,
    isFullScreen,
    setFullScreen,
  } = props;
  const { mutate } = useSetCurrentSlide();
  const { currentSlide } = useSlideChanged(channelId);
  const { slideUrls, isMaster, isChat } = useChannelSelector((state) => state);
  const syncSlide = useSyncSlide(
    isMaster,
    isSync,
    page,
    currentSlide,
  );
  const directionKey = {};

  directionKey[KEYCODE_BACK] = false;
  directionKey[KEYCODE_FOWARD] = true;

  const handleSetPage = (direction) => () => {
    const sync = !isMaster && isSync ? currentSlide : page;
    if (!moveSlidePossible(direction, sync, slideUrls.length)) return;
    if (!isMaster && isSync) {
      setSync(false);
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

  const screenChange = (e) => setFullScreen(e);
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
          onChange={screenChange}
        >
          <MainSlide
            page={syncSlide}
            slideUrls={slideUrls}
          />
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
  channelId: PropTypes.string.isRequired,
  isSync: PropTypes.bool.isRequired,
  setSync: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  setFullScreen: PropTypes.func.isRequired,
};

export default SlideViewer;
