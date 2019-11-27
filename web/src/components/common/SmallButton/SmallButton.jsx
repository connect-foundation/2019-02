import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const SmallButton = (props) => {
  const { children, color } = props;
  return (
    <S.SmallButton
      color={color}
      variant="contained"
    >
      {children}
    </S.SmallButton>
  );
};

SmallButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
};
export default SmallButton;
