import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import { useChannelSelector } from '@/hooks';

const ANONYMOUS_CHANGED = gql`
  subscription OptionChanged($channelId: String!) {
    optionChanged(channelId: $channelId) {
      anonymousChat
    }
  }
`;

const useAnonymousChanged = (channelId) => {
  const prevAnonymousChat = useChannelSelector((state) => state.anonymousChat);
  const { data } = useSubscription(ANONYMOUS_CHANGED, { variables: { channelId } });
  const anonymousChat = !data ? prevAnonymousChat : data.optionChanged.anonymousChat;

  return { anonymousChat };
};


export default useAnonymousChanged;
