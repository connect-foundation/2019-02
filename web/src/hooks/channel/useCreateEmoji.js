import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';


const START_FLYING_EMOJI = gql`
  subscription StartFlyingEmoji($channelId: String!) {
    startFlyingEmoji(channelId: $channelId) {
      type
    }
  }
`;

const useCreateEmoji = (channelId) => {
  const published = useSubscription(START_FLYING_EMOJI, { variables: { channelId } });
  const startFlyingEmoji = published.data && published.data.startFlyingEmoji;

  return startFlyingEmoji;
};

export default useCreateEmoji;
