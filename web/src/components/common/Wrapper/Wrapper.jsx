import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const Wrapper = ({ children }) => (
  <S.Wrapper>
    {children}
  </S.Wrapper>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;
