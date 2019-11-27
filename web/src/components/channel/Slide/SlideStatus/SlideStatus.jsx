import React from 'react';
import PropTypes from 'prop-types';
import { useSlideChanged } from '@/hooks';
import S from './style';

const SlideStatus = (props) => {
  const { channelId } = props;
  const { data } = useSlideChanged(channelId);

  return (
    <S.SlideStatus>{data}</S.SlideStatus>
  );
};

SlideStatus.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default SlideStatus;
