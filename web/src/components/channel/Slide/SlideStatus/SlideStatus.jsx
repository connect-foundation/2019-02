import React from 'react';
import PropTypes from 'prop-types';
import S from './style';
import StatusButton from './StatusButton';
import SlideSyncButton from './SlideSyncButton';
import FullScreenButton from './FullScreenButton';
import NoteButton from './NoteButton';
import { useChannelSelector } from '@/hooks';

const SlideStatus = (props) => {
  const { setFullScreen } = props;
  const isMaster = useChannelSelector((state) => state.isMaster);

  return (
    <S.SlideStatus>
      <StatusButton />
      <S.Wrapper>
        {!isMaster
        && (
        <SlideSyncButton />
        )}
        <NoteButton />
        <FullScreenButton setFullScreen={setFullScreen} />
      </S.Wrapper>
    </S.SlideStatus>
  );
};

SlideStatus.propTypes = {
  setFullScreen: PropTypes.func.isRequired,
};

export default SlideStatus;
