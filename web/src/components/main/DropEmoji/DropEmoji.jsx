import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const DropEmoji = (props) => {
  const { emoji } = props;

  return (
    <S.Emoji>
      <span role="img" aria-label="dropEmoji">{emoji}</span>
    </S.Emoji>
  );
};

DropEmoji.propTypes = {
  emoji: PropTypes.string.isRequired,
};

export default DropEmoji;
