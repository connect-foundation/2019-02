import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@/components/common';
import SettingInput from './SettingInput';
import S from './style';

const SettingModal = (props) => {
  const { closeSettingModal, isModalOpened } = props;

  return (
    <Modal isShown={isModalOpened}>
      <S.Content>
        <S.SettingContent>
          <S.Title>채널 설정</S.Title>
          <SettingInput />
        </S.SettingContent>
        <S.ButtonCloseModal onClick={closeSettingModal} />
      </S.Content>
    </Modal>
  );
};

SettingModal.propTypes = {
  isModalOpened: PropTypes.bool.isRequired,
  closeSettingModal: PropTypes.func.isRequired,
};

export default SettingModal;
