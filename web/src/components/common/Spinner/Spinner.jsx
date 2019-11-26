import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import S from './style';

const Spinner = () => (
  <S.SpinnerWrapper>
    <CircularProgress />
  </S.SpinnerWrapper>
);

export default Spinner;
