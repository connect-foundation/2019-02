import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

const LISTENER_LIST_CHANGED = gql`
  subscription ListenerListChanged($channelId: String!) {
    listenerListChanged(channelId: $channelId) {
      listenerList
    }
  }
`;

const useListenerListChanged = (channelId) => {
  const { data } = useSubscription(LISTENER_LIST_CHANGED, { variables: { channelId } });
  const listenerList = !data ? [] : data.listenerListChanged.listenerList;

  return { listenerList };
};

export default useListenerListChanged;
