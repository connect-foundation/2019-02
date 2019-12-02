import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const MainSlide = (props) => {
  const { page, slideUrls } = props;

  return (
    <S.MainSlide>
      <S.SlideWrapper>
        <S.SlideImg alt="slide" src={slideUrls[page]} />
      </S.SlideWrapper>
    </S.MainSlide>
  );
};

MainSlide.propTypes = {
  page: PropTypes.number.isRequired,
  slideUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MainSlide;
