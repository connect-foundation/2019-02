import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import { useChannelSelector } from '@/hooks';

const CHANNELNAME_CHANGED = gql`
  subscription OptionChanged($channelId: String!) {
    optionChanged(channelId: $channelId) {
      channelName
    }
  }
`;

const useChannelNameChanged = (channelId) => {
  const prevChannelName = useChannelSelector((state) => state.channelName);
  const { data } = useSubscription(CHANNELNAME_CHANGED, { variables: { channelId } });
  const channelName = !data ? prevChannelName : data.optionChanged.channelName;

  return { channelName };
};


export default useChannelNameChanged;
