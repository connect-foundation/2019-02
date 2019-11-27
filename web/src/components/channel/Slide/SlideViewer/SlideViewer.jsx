import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import { useChannelSelector, useSetCurrentSlide } from '@/hooks';
import movePagePossible from '@/utils/movePagePossible';
import Indicator from './Indicator';
import MainSlide from './MainSlide';
import PageNumber from './PageNumber';

const SlideViewer = (props) => {
  const { channelId } = props;
  const { mutate } = useSetCurrentSlide();
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
        page={page}
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
        channelId={channelId}
        slideLength={slideUrls.length}
      />
    </S.SlideViewer>
  );
};

SlideViewer.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default SlideViewer;
