import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import useChannelSelector from './useChannelSelector';

const CHANNEL_STATUS_CHANGED = gql`
  subscription channelStatusChanged($channelId: String!) {
    channelStatusChanged(channelId: $channelId) {
      channelStatus
    }
  }
`;

const useChannelStatus = () => {
  const { channelId, channelStatus } = useChannelSelector((state) => state);
  const { loading, data } = useSubscription(CHANNEL_STATUS_CHANGED, { variables: { channelId } });
  const status = loading ? channelStatus : data.channelStatusChanged.channelStatus;

  return status;
};

export default useChannelStatus;
