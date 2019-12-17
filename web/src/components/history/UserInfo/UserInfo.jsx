import React from 'react';
import PropTypes from 'prop-types';
import UserInfoText from '../UserInfoText';
import UserInfoButton from '../UserInfoButton';
import S from './style';

const UserInfo = (props) => {
  const { setHistoryState } = props;

  return (
    <>
      <S.UserInfo>
        <S.Profile />
        <UserInfoText />
        <UserInfoButton setHistoryState={setHistoryState} />
      </S.UserInfo>
    </>
  );
};

UserInfo.propTypes = {
  setHistoryState: PropTypes.func.isRequired,
};

export default UserInfo;
