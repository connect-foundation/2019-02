import React from 'react';
import PropTypes from 'prop-types';
import S from './style';
import StatusButton from './StatusButton';
import SlideSyncButton from './SlideSyncButton';
import NoteButton from './NoteButton';
import FullScreenButton from './FullScreenButton';


const SlideStatus = (props) => {
  const { isSync, setSync } = props;

  return (
    <S.SlideStatus>
      <StatusButton />
      <S.Wrapper>
        <SlideSyncButton
          isSync={isSync}
          setSync={setSync}
        />
        <NoteButton />
        <FullScreenButton />
      </S.Wrapper>
    </S.SlideStatus>
  );
};

SlideStatus.propTypes = {
  isSync: PropTypes.bool.isRequired,
  setSync: PropTypes.func.isRequired,
};

export default SlideStatus;
