import gql from 'graphql-tag';
import cache from './index';

const getChatLogs = () => {
  const { chatLogs: { logs } } = cache.readQuery({
    query: gql`
      query ChatLogs {
        chatLogs @client {
          logs
        }
      }
    `,
  });

  return logs;
};

export default getChatLogs;
