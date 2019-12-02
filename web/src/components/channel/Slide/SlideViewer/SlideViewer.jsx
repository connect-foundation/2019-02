import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import {
  useChannelSelector,
  useSetCurrentSlide,
  useSlideChanged,
  useSyncSlide,
} from '@/hooks';
import { moveSlide, moveSlidePossible } from '@/utils/slide';
import Indicator from './Indicator';
import MainSlide from './MainSlide';
import PageNumber from './PageNumber';

const moveTo = ['back', 'foward'];

const SlideViewer = (props) => {
  const {
    channelId,
    isSync,
    setSync,
    page,
    setPage,
  } = props;
  const { mutate } = useSetCurrentSlide();
  const { currentSlide } = useSlideChanged(channelId);
  const { slideUrls, isMaster } = useChannelSelector((state) => state);
  const syncSlide = useSyncSlide(
    isMaster,
    isSync,
    page,
    currentSlide,
  );
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

  useEffect(() => {
    if (!isMaster) return;
    mutate({ variables: { channelId, currentSlide: page } });
  }, [page]);

  return (
    <S.SlideViewer>
      <MainSlide
        page={syncSlide}
        slideUrls={slideUrls}
      />
      {moveTo.map((direction) => (
        <Indicator
          key={direction}
          direction={direction}
          handleSetPage={handleSetPage}
        />
      ))}
      <PageNumber
        currentSlide={syncSlide + 1}
        slideLength={slideUrls.length}
      />
    </S.SlideViewer>
  );
};

SlideViewer.propTypes = {
  channelId: PropTypes.string.isRequired,
  isSync: PropTypes.bool.isRequired,
  setSync: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default SlideViewer;
