import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Header, Container } from '../common';

const Layout = ({ children }) => (
  <Wrapper>
    <Header />
    <Container>{children}</Container>
  </Wrapper>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
