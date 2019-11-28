import React from 'react';
import PropTypes from 'prop-types';
import S from './style';
import StatusButton from './StatusButton';
import SlideSyncButton from './SlideSyncButton';
import NoteButton from './NoteButton';
import FullScreenButton from './FullScreenButton';
import { useChannelSelector } from '@/hooks';


const SlideStatus = (props) => {
  const { isSync, handleSync } = props;
  const isMaster = useChannelSelector((state) => state.isMaster);

  return (
    <S.SlideStatus>
      <StatusButton />
      <S.Wrapper>
        {!isMaster
        && (
        <SlideSyncButton
          isSync={isSync}
          handleSync={handleSync}
        />
        )}
        <NoteButton />
        <FullScreenButton />
      </S.Wrapper>
    </S.SlideStatus>
  );
};

SlideStatus.propTypes = {
  isSync: PropTypes.bool.isRequired,
  handleSync: PropTypes.func.isRequired,
};

export default SlideStatus;
