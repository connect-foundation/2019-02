import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const BROADCAST_EMOJI = gql`
  mutation BroadcastEmoji(
    $channelId: String!,
    $type: String,
    ) {
    broadcastEmoji(
      channelId: $channelId,
      type: $type,
    ) {
      type
    }
  }
`;

const useAddEmoji = () => {
  const [broadcastEmoji] = useMutation(BROADCAST_EMOJI);
  return { mutate: broadcastEmoji };
};

export default useAddEmoji;
