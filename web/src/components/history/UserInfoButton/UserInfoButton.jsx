import React from 'react';
import PropTypes from 'prop-types';
import S from './style';

const UserInfoButton = (props) => {
  const { setHistoryState } = props;
  const setHistoryStateType = (type) => () => {
    setHistoryState(type);
  };

  return (
    <>
      <S.UserInfoButton onClick={setHistoryStateType('speaker')}>
        <span role="img" aria-label="speaker-img">🐤</span>
      스피커 히스토리 보기
      </S.UserInfoButton>
      <S.UserInfoButton onClick={setHistoryStateType('listener')}>
        <span role="img" aria-label="speaker-img">🦉</span>
      리스너 히스토리 보기
      </S.UserInfoButton>
    </>
  );
};

UserInfoButton.propTypes = {
  setHistoryState: PropTypes.func.isRequired,
};

export default UserInfoButton;
