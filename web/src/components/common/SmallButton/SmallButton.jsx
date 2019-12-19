import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const SmallButton = (props) => {
  const { children, color, onClick } = props;

  return (
    <S.SmallButton
      color={color}
      variant="contained"
      onClick={onClick}
    >
      {children}
    </S.SmallButton>
  );
};

SmallButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

SmallButton.defaultProps = {
  color: 'inherit',
  onClick: () => {},
};

export default SmallButton;
