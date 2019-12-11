import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Header } from '../common';

const Layout = ({ children }) => (
  <Wrapper>
    <Header />
    {children}
  </Wrapper>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
