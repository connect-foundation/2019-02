import React from 'react';
import S from './style';

const UserSettingModal = () => (
  <>
    <S.Modal>
      <S.Profile />
      <S.SettingInput
        id="outlined-basic"
        label="닉네임"
        variant="outlined"
      />
      <S.SettingInput
        id="outlined-basic"
        label="유저네임"
        variant="outlined"
      />
      <S.SettingButton
        variant="contained"
        color="primary"
      >
        수정하기
      </S.SettingButton>
      <S.ModalClosedButton>
        <span role="img" aria-label="modal-close">✖️</span>
      </S.ModalClosedButton>
    </S.Modal>
  </>
);

export default UserSettingModal;
