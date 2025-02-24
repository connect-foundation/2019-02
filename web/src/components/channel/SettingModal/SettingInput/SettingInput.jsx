import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  useUpdateChannelOptions,
  useChannelSelector,
} from '@/hooks';
import S from './style';

const SettingPresentation = (props) => {
  const { closeSettingModal } = props;
  const { mutate } = useUpdateChannelOptions();
  const {
    channelId,
    channelName,
    anonymousChat,
    emojiEffect,
  } = useChannelSelector((state) => state);
  const [newChannelName, setChannelName] = useState(channelName);
  const [newAnonymousChat, setAnonymousChat] = useState(anonymousChat);
  const [flyingEmojiEffect, setFlyingEmojiEffect] = useState(emojiEffect);
  const handleChannelNameChanged = (event) => setChannelName(event.target.value.substring(0, 20));
  const changeChannelOptions = () => {
    mutate({
      variables: {
        channelId,
        channelOptions: {
          channelName: newChannelName,
          anonymousChat: newAnonymousChat,
          emojiEffect: flyingEmojiEffect,
        },
      },
    });
    closeSettingModal();
  };

  return (
    <S.SettingPresentation>
      <S.InputWrapper>
        <S.InputRow>
          채널 제목
          <S.TextField
            value={newChannelName}
            onChange={handleChannelNameChanged}
          />
        </S.InputRow>
        <S.InputRow>
        익명 채팅 허용
          <S.SwitchButton
            onChange={() => setAnonymousChat(!newAnonymousChat)}
            checked={newAnonymousChat}
          />
        </S.InputRow>
        <S.InputRow>
        플라잉 이모지 허용
          <S.SwitchButton
            onChange={() => setFlyingEmojiEffect(!flyingEmojiEffect)}
            checked={flyingEmojiEffect}
          />
        </S.InputRow>
      </S.InputWrapper>
      <S.AreaButtons>
        <S.SaveButton onClick={changeChannelOptions}>저장하기</S.SaveButton>
      </S.AreaButtons>
    </S.SettingPresentation>
  );
};

SettingPresentation.propTypes = {
  closeSettingModal: PropTypes.func.isRequired,
};

export default SettingPresentation;
