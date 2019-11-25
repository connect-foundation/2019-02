import getChatLogs from '@/graphql/cache/getChatLogs';
import cache from '../cache';

const resolver = {
  Mutation: {
    addChat: (_, { chat }) => {
      const chatLogs = getChatLogs();
      const data = {
        chatLogs: {
          __typename: 'chatLogs',
          logs: [...chatLogs, chat],
        },
      };

      cache.writeData({ data });

      return data.chatLogs;
    },
  },
};

export default resolver;
