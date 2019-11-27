import React, { useState } from 'react';
import S from './style';
import Indicator from './Indicator';
import MainSlide from './MainSlide';
import { useChannelSelector } from '@/hooks';
import movePagePossible from '@/utils/movePagePossible';

const SlideViewer = () => {
  const [page, setPage] = useState(0);
  const slideUrls = useChannelSelector((state) => state.slideUrls);
  const handleSetPage = (direction) => () => {
    if (!movePagePossible(direction, page, slideUrls.length)) return;
    if (direction === 'back') setPage(page - 1);
    else setPage(page + 1);
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

export default SlideViewer;
