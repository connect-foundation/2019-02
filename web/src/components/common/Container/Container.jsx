import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const Container = ({ children }) => (
  <S.Container>{children}</S.Container>
);

Container.propTypes = {
  children: PropTypes.element,
};

export default Container;
