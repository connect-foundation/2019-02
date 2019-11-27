import React, { useState } from 'react';
import PropTypes from 'prop-types';
import S from './style';
import Indicator from './Indicator';
import MainSlide from './MainSlide';
import { useChannelSelector, useSetCurrentSlide } from '@/hooks';
import movePagePossible from '@/utils/movePagePossible';

const SlideViewer = (props) => {
  const { channelId } = props;
  const [page, setPage] = useState(0);
  const slideUrls = useChannelSelector((state) => state.slideUrls);
  const isMaster = useChannelSelector((state) => state.isMaster);

  const { mutate } = useSetCurrentSlide();
  const handleSetPage = (direction) => () => {
    if (!movePagePossible(direction, page, slideUrls.length)) return;
    if (direction === 'back') setPage(page - 1);
    else setPage(page + 1);

    if (isMaster) { mutate({ variables: { channelId, currentSlide: page } }); }
  };

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
    </S.SlideViewer>
  );
};

SlideViewer.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default SlideViewer;
