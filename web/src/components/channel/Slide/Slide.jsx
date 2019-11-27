import React from 'react';
import PropTypes from 'prop-types';
import S from './style';
import SlideStatus from './SlideStatus';
import SlideViewer from './SlideViewer';
import SlideInfo from './SlideInfo';

const Slide = (props) => {
  const { channelId } = props;

  return (
    <S.Slide>
      <SlideStatus />
      <SlideViewer channelId={channelId} />
      <SlideInfo />
    </S.Slide>
  );
};

Slide.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default Slide;
