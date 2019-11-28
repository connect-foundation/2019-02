import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const PageNumber = (props) => {
  const { slideLength, currentSlide } = props;

  return (
    <S.PageNumber>
      {currentSlide}
/
      {slideLength}
    </S.PageNumber>
  );
};

PageNumber.propTypes = {
  slideLength: PropTypes.number.isRequired,
  currentSlide: PropTypes.number.isRequired,

};

export default PageNumber;
