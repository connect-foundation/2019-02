import React from 'react';
import S from './style';

const ChatSort = () => (
  <S.ChatSort>
    <S.SortButton aria-selected="true">최신순</S.SortButton>
    <S.SortButton>공감순</S.SortButton>
  </S.ChatSort>
);

export default ChatSort;
