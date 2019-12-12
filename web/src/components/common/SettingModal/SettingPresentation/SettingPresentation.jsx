import React, { useState } from 'react';
import S from './style';

const SettingPresentation = () => {
  const [title, setTitle] = useState('채널 제목 테스트용 더미 데이터');
  const handleTitleChanged = (event) => setTitle(event.target.value.substring(0, 50));

  return (
    <S.SettingPresentation>
      <S.TextField
        label="채널 제목"
        value={title}
        onChange={handleTitleChanged}
      />
      <S.AreaButtons>
        <S.SaveButton>저장하기</S.SaveButton>
      </S.AreaButtons>
    </S.SettingPresentation>
  );
};

export default SettingPresentation;
