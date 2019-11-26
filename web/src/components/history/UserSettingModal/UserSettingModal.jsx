import React from 'react';
import S from './style';

const UserSettingModal = () => (
  <>
    <S.ModalWrapper>
      <S.Modal>
        <div>
          모달창입니다.
          <input type="text" />
          <input type="text" />
        </div>
      </S.Modal>
    </S.ModalWrapper>
  </>
);

export default UserSettingModal;
