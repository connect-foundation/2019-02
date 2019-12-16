import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SlideStatus from './SlideStatus';
import SlideViewer from './SlideViewer';
import SlideInfo from './SlideInfo';
import S from './style';

const Slide = (props) => {
  const { channelId, openSettingModal, listenerList } = props;
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
      <SlideInfo
        channelId={channelId}
        isFullScreen={isFullScreen}
        listenerList={listenerList}
      />
    </S.Slide>
  );
};

Slide.propTypes = {
  channelId: PropTypes.string.isRequired,
  openSettingModal: PropTypes.func.isRequired,
  listenerList: PropTypes.number.isRequired,
};

export default Slide;
