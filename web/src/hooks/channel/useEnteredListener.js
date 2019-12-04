import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ENTERED_LISTENER = gql`
  mutation UseEnteredListener($channelId: String!) {
    enteredListener(channelId: $channelId) { 
      listenerList
    }
  }
`;

const useEnteredListener = () => {
  const [enteredListener] = useMutation(ENTERED_LISTENER);

  return { mutate: enteredListener };
};

export default useEnteredListener;
