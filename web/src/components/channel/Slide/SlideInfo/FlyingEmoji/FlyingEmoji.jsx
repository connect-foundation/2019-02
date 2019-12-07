import React from 'react';
import PropTypes from 'prop-types';

const FlyingEmoji = (props) => {
  const { type } = props;

  return (
    <>
      <div type={type} />
    </>
  );
};

FlyingEmoji.propTypes = {
  type: PropTypes.string.isRequired,
};
export default FlyingEmoji;
