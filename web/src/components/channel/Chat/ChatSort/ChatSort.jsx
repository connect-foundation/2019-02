import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useChangeChatSort } from '@/hooks';
import { CHAT_SORT_BY_RECENT, CHAT_SORT_BY_LIKE } from '@/constants';
import S from './style';

const ChatSort = (props) => {
  const { isClosed, toggleChatBox } = props;
  const [sortType, setSortType] = useState(CHAT_SORT_BY_RECENT);
  const changeSort = useChangeChatSort();
  const handleClick = (targetSortType) => {
    if (sortType === targetSortType) return;

    changeSort(targetSortType);
    setSortType(targetSortType);
  };

  return (
    <S.ChatSort>
      {!isClosed && (
        <>
          <S.SortButton
            aria-selected={sortType === CHAT_SORT_BY_RECENT}
            onClick={() => handleClick(CHAT_SORT_BY_RECENT)}
          >
            최신순
          </S.SortButton>
          <S.SortButton
            aria-selected={sortType === CHAT_SORT_BY_LIKE}
            onClick={() => handleClick(CHAT_SORT_BY_LIKE)}
          >
            공감순
          </S.SortButton>
        </>
      )}
      <S.SwitchButton
        onChange={toggleChatBox}
        checked={!isClosed}
      />
    </S.ChatSort>
  );
};

ChatSort.propTypes = {
  isClosed: PropTypes.bool.isRequired,
  toggleChatBox: PropTypes.func.isRequired,
};

export default ChatSort;
