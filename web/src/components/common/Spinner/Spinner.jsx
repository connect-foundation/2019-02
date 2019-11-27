import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import S from './style';

const Spinner = () => (
  <S.Spinner>
    <CircularProgress />
  </S.Spinner>
);

export default Spinner;
