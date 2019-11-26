import React, { useState } from 'react';
import UserInfoText from '../UserInfoText';
import UserInfoButton from '../UserInfoButton';
import UserSettingModal from '../UserSettingModal';
import S from './style';

const UserInfo = () => {
  const [showSettingModal, setShowSettingModal] = useState(false);
  return (
    <>
      <S.UserInfoWrapper>
        <S.Setting onClick={() => setShowSettingModal(true)}>
          <span role="img" aria-label="setting-img">
          ✏️
          </span>
        </S.Setting>
        <S.Profile />
        <UserInfoText />
        <UserInfoText />
        <UserInfoButton />
        <UserInfoButton />
      </S.UserInfoWrapper>
      {showSettingModal && <UserSettingModal />}
    </>
  );
};

export default UserInfo;
