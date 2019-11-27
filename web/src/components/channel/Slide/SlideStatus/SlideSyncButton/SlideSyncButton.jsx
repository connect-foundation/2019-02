import React from 'react';
import PropTypes from 'prop-types';
import { SmallButton } from '@/components/common';

const SlideSyncButton = (props) => {
  const { isSync, handleSync } = props;
  const color = isSync ? 'secondary' : 'inherit';

  return (
    <SmallButton
      color={color}
      onClick={handleSync}
    >
      <span aria-label="sync" role="img">⚡️</span>
      스피커 동기화
    </SmallButton>
  );
};

SlideSyncButton.propTypes = {
  isSync: PropTypes.bool.isRequired,
  handleSync: PropTypes.func.isRequired,
};

export default SlideSyncButton;
