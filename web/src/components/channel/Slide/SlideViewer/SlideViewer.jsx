import React, { useState } from 'react';
import S from './style';
import Indicator from './Indicator';
import MainSlide from './MainSlide';
import { useChannelSelector } from '@/hooks';

const SlideViewer = () => {
  const [page, setPage] = useState(0);
  const slideUrls = useChannelSelector((state) => state.slideUrls);
  const handleSetPage = (direction) => () => {
    if (direction === 'back' && page === 0) return;
    if (direction === 'foward' && page === slideUrls.length - 1) return;
    if (direction === 'back') setPage(page - 1);
    else setPage(page + 1);
  };

  return (
    <S.Wrapper>
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
    </S.Wrapper>
  );
};

export default SlideViewer;
