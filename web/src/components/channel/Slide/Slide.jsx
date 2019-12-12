import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SlideStatus from './SlideStatus';
import SlideViewer from './SlideViewer';
import SlideInfo from './SlideInfo';
import S from './style';

const Slide = (props) => {
  const { openSettingModal } = props;
  const [isFullScreen, setFullScreen] = useState(false);

  return (
    <S.Slide>
      <SlideStatus
        setFullScreen={setFullScreen}
        openSettingModal={openSettingModal}
      />
      <SlideViewer
        isFullScreen={isFullScreen}
        setFullScreen={setFullScreen}
      />
      <SlideInfo channelId={channelId} />
    </S.Slide>
  );
};

Slide.propTypes = {
  openSettingModal: PropTypes.func.isRequired,
};

export default Slide;
