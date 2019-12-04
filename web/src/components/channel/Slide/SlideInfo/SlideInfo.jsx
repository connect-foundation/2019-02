import React from 'react';
import PropTypes from 'prop-types';
import People from '@@/people.svg';
import S from './style';
import { useChannelSelector } from '@/hooks';
import CodeShareButton from './CodeShareButton';
import SlideDownloadButton from './SlideDownloadButton';

const SlideInfo = (props) => {
  const { listenerList } = props;
  const channelName = useChannelSelector((state) => state.channelName);
  const masterName = useChannelSelector((state) => state.masterName);

  return (
    <S.SlideInfo>
      <S.ChannelSummaryWrapper>
        <S.TitleWrapper>
          <S.ChannelTitle>{channelName}</S.ChannelTitle>
          <S.MasterName>
            <span>| &nbsp;&nbsp;</span>
            {masterName}
          </S.MasterName>
        </S.TitleWrapper>
        <S.PeopleWrapper>
          <S.PeopleLogo
            src={People}
            alt="people-logo"
          />
          {listenerList}
          명 참여중
        </S.PeopleWrapper>
      </S.ChannelSummaryWrapper>
      <S.SlideButtonsWrapper>
        <SlideDownloadButton />
        <CodeShareButton />
      </S.SlideButtonsWrapper>
    </S.SlideInfo>
  );
};

SlideInfo.propTypes = {
  listenerList: PropTypes.number.isRequired,
};

export default SlideInfo;
