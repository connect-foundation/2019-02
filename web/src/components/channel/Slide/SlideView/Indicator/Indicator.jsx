import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const Indicator = (props) => {
  const { direction } = props;

  return (
    <S.Wrapper direction={direction}>
      <S.ArrowWrapper direction={direction}>
        {direction === 'back'
          ? <S.ArrowBack />
          : <S.ArrowFoward />}
      </S.ArrowWrapper>
    </S.Wrapper>
  );
};

Indicator.propTypes = {
  direction: PropTypes.string.isRequired,
};

export default Indicator;
