import React, { useState } from 'react';
import { Fade, Backdrop } from '@material-ui/core';
import UserInfoText from '../UserInfoText';
import UserInfoButton from '../UserInfoButton';
import UserSettingModal from '../UserSettingModal';
import S from './style';

const UserInfo = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <S.UserInfoWrapper>
        <S.Setting onClick={handleOpen}>
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
      <S.SettingModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <S.SettingModalPage>
            <UserSettingModal />
          </S.SettingModalPage>
        </Fade>
      </S.SettingModal>
    </>
  );
};

export default UserInfo;
