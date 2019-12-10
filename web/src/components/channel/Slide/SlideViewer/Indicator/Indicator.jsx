import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const Indicator = (props) => {
  const { direction, handleSetPage } = props;

  return (
    <S.Indicator
      onClick={handleSetPage(direction)}
      direction={direction ? 1 : 0}
    >
      <S.ArrowWrapper direction={direction ? 1 : 0}>
        {!direction
          ? <S.ArrowBack />
          : <S.ArrowFoward />}
      </S.ArrowWrapper>
    </S.Indicator>
  );
};

Indicator.propTypes = {
  direction: PropTypes.bool.isRequired,
  handleSetPage: PropTypes.func.isRequired,
};

export default Indicator;
