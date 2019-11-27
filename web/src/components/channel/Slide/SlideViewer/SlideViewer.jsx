import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import { useChannelSelector, useSetCurrentSlide, useSlideChanged } from '@/hooks';
import movePagePossible from '@/utils/movePagePossible';
import Indicator from './Indicator';
import MainSlide from './MainSlide';
import PageNumber from './PageNumber';

const SlideViewer = (props) => {
  const { channelId, isSync } = props;
  const { mutate } = useSetCurrentSlide();
  const { currentSlide } = useSlideChanged(channelId);
  const slideUrls = useChannelSelector((state) => state.slideUrls);
  const isMaster = useChannelSelector((state) => state.isMaster);
  const [page, setPage] = useState(0);
  const handleSetPage = (direction) => () => {
    if (!movePagePossible(direction, page, slideUrls.length)) return;
    if (direction === 'back') setPage(page - 1);
    else setPage(page + 1);
  };

  useEffect(() => {
    if (!isMaster) return;
    mutate({ variables: { channelId, currentSlide: page } });
  }, [page]);

  return (
    <S.SlideViewer>
      <MainSlide
        page={isSync ? currentSlide : page}
        slideUrls={slideUrls}
      />
      <Indicator
        handleSetPage={handleSetPage}
        direction="back"
      />
      <Indicator
        handleSetPage={handleSetPage}
        direction="foward"
      />
      <PageNumber
        currentSlide={isSync ? currentSlide + 1 : page + 1}
        slideLength={slideUrls.length}
      />
    </S.SlideViewer>
  );
};

SlideViewer.propTypes = {
  channelId: PropTypes.string.isRequired,
  isSync: PropTypes.bool.isRequired,
};

export default SlideViewer;
