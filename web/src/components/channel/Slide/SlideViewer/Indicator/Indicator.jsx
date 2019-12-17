import React from 'react';
import PropTypes from 'prop-types';
import S from './style';
import { useChannelSelector } from '@/hooks';

const Indicator = (props) => {
  const { direction, handleSetPage } = props;
  const { isPenToolActive } = useChannelSelector((state) => state);

  return (
    <S.Indicator
      onClick={handleSetPage(direction)}
      direction={direction ? 1 : 0}
      isPenToolActive={isPenToolActive}
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
