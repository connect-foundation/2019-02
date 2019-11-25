import React from 'react';
import PropTypes from 'prop-types';
import { useChatAdded } from '@/hooks';

const ChatLogs = (props) => {
  const { channelId } = props;
  const { data } = useChatAdded(channelId);

  return (
    <>
      <ul>
        {data && data.map(({ author, message }, i) => (
          <li key={`chat-${i * 1}`}>
            {author.displayname}
:
            {message}
          </li>
        ))}
      </ul>
    </>
  );
};

ChatLogs.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default ChatLogs;
