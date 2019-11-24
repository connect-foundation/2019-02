import React from 'react';
import S from './style';
import DropEmoji from '../DropEmoji';
import DropText from '../DropText';
import DropInput from '../DropInput';

const DropModal = () => (
  <S.ModalWrapper>
    <S.Modal>
      <DropEmoji />
      <DropText />
      <DropInput />
    </S.Modal>
  </S.ModalWrapper>
);

export default DropModal;
