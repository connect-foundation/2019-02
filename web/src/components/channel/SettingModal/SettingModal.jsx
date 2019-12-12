import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@/components/common';
import SettingPresentation from './SettingPresentation';
import S from './style';

const settings = [
  {
    title: 'Presentation Settings',
    IconComponent: S.IconPresentation,
    SettingComponent: SettingPresentation,
  },
  {
    title: 'Listener Settings',
    IconComponent: S.IconListener,
    SettingComponent: null,
  },
];

const SettingModal = (props) => {
  const { closeSettingModal, isModalOpened } = props;
  const [index, setIndex] = useState(0);
  const { title, SettingComponent } = settings[index] || {};
  const categories = settings.map(({ IconComponent }, i) => (
    <S.Category key={`setting_icon_${i * i}`}>
      <S.CategoryButton onClick={() => setIndex(i)}>
        <IconComponent isActive={i === index} />
      </S.CategoryButton>
    </S.Category>
  ));

  return (
    <Modal isShown={isModalOpened}>
      <S.Content>
        <S.Categories>
          {categories}
        </S.Categories>
        <S.SettingContent>
          <S.Title>{title}</S.Title>
          {SettingComponent && <SettingComponent />}
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
