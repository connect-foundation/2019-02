import React from 'react';
import PropTypes from 'prop-types';
import { SmallButton } from '@/components/common';

const FullScreenButton = (props) => {
  const { setFullScreen } = props;

  return (
    <SmallButton onClick={() => setFullScreen(true)}>
      <span aria-label="sync" role="img">🎬</span>
    전체화면
    </SmallButton>
  );
};

FullScreenButton.propTypes = {
  setFullScreen: PropTypes.func.isRequired,
};

export default FullScreenButton;
