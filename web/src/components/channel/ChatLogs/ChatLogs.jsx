import React from 'react';
import PropTypes from 'prop-types';
import { useChatAdded } from '@/hooks';

const ChatLogs = (props) => {
  const { channelId } = props;
  const { data } = useChatAdded(channelId);
  return (
    <>
      <ul>
        {data && (
        <li>
          {data.author.displayname}
          :
          {data.message}
        </li>
        )}
      </ul>
    </>
  );
};

ChatLogs.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default ChatLogs;
