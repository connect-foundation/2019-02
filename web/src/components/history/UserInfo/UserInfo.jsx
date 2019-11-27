import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Fade, Backdrop } from '@material-ui/core';
import UserInfoDisplayName from '../UserInfoDisplayName';
import UserInfoUserId from '../UserInfoUserId';
import UserInfoButton from '../UserInfoButton';
import UserSettingModal from '../UserSettingModal';
import S from './style';

const GET_AUTH = gql`
query Auth {
  authentication @client {
    isLoggedIn
    userId
    displayName
  }
}
`;

const UserInfo = () => {
  const { data: { authentication } } = useQuery(GET_AUTH);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <S.UserInfo>
        <S.Setting onClick={handleOpen}>
          <span role="img" aria-label="setting-img">
          ✏️
          </span>
        </S.Setting>
        <S.Profile />
        <UserInfoDisplayName displayName={authentication.displayName} />
        {authentication.userId && <UserInfoUserId userId={authentication.userId} /> }
        <UserInfoButton />
        <UserInfoButton />
      </S.UserInfo>
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
