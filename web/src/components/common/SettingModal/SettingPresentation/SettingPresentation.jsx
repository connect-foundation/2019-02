import React, { useState, useEffect } from 'react';
import { useUpdatePresentationSettings, useChannelSelector, useDispatch } from '@/hooks';
import S from './style';

const SettingPresentation = () => {
  const dispatch = useDispatch();
  const channel = useChannelSelector((state) => state);
  const { mutate, data } = useUpdatePresentationSettings();
  const [channelName, setChannelName] = useState(channel.channelName);
  const handleChannelNameChanged = (event) => setChannelName(event.target.value.substring(0, 20));
  const changeChannelName = () => {
    if (channelName) mutate({ variables: { channelId: channel.channelId, channelName } });
  };

  useEffect(() => {
    if (data) dispatch({ type: 'SET_CHANNEL_NAME', payload: data.channelName });
  }, [data]);

  return (
    <S.SettingPresentation>
      <S.TextField
        label="채널 제목"
        value={channelName}
        onChange={handleChannelNameChanged}
      />
      <S.AreaButtons>
        <S.SaveButton onClick={changeChannelName}>저장하기</S.SaveButton>
      </S.AreaButtons>
    </S.SettingPresentation>
  );
};

export default SettingPresentation;
