import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { useGetUserStatus } from '@/hooks';
import S from './style';

const UserSettingModal = (props) => {
  const { displayName } = useGetUserStatus();
  const { handleClose } = props;

  const noActionHandleClose = () => handleClose();
  const saveActionHandleClose = () => handleClose();

  return (
    <>
      <S.Modal>
        <S.Profile />
        <S.SettingInput
          id="outlined-basic"
          label="닉네임"
          variant="outlined"
          value={displayName}
        />
        <S.SettingButton
          variant="contained"
          color="primary"
          onClick={saveActionHandleClose}
        >
        수정하기
        </S.SettingButton>
        <S.ModalClosedButton>
          <CloseIcon onClick={noActionHandleClose} />
        </S.ModalClosedButton>
      </S.Modal>
    </>
  );
};

UserSettingModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default UserSettingModal;
