import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const BROADCAST_EMOJI = gql`
  mutation BroadcastEmoji(
    $channelId: String!,
    $type: String,
    $positionX: Int,
    $positionY: Int,
    ) {
    broadcastEmoji(
      channelId: $channelId,
      type: $type,
      positionX: $positionX,
      positionY: $positionY
    ) {
      type
      positionX
      positionY
    }
  }
`;

const useAddEmoji = () => {
  const [broadcastEmoji] = useMutation(BROADCAST_EMOJI);
  return { mutate: broadcastEmoji };
};

export default useAddEmoji;
