import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const LEAVE_LISTENER = gql`
  mutation UseLeaveListener($channelId: String!, $listenerList: [String]) {
    leaveListener(channelId: $channelId, listenerList: $listenerList) { 
      listenerList
    }
  }
`;

const useLeaveListener = () => {
  const [leaveListener] = useMutation(LEAVE_LISTENER);

  return { mutate: leaveListener };
};

export default useLeaveListener;
