import React from 'react';
import PropTypes from 'prop-types';
import { useSlideChanged } from '@/hooks';
import S from './style';

const PageNumber = (props) => {
  const { channelId, slideLength } = props;
  const { data } = useSlideChanged(channelId);

  return (
    <S.PageNumber>
      {data + 1}
/
      {slideLength}
    </S.PageNumber>
  );
};

PageNumber.propTypes = {
  channelId: PropTypes.string.isRequired,
  slideLength: PropTypes.number.isRequired,
};

export default PageNumber;
