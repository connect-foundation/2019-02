import gql from 'graphql-tag';
import {
  useSubscription,
} from '@apollo/react-hooks';

const START_FLYING_EMOJI = gql`
  subscription StartFlyingEmoji($type: String!, $channelId: String!) {
    startFlyingEmoji(type: $type, channelId: $channelId) {
      type
    }
  }
`;

const useCreateEmoji = (type, channelId) => {
  const published = useSubscription(START_FLYING_EMOJI, { variables: { type, channelId } });
  const startFlyingEmoji = published.data && published.data.startFlyingEmoji;

  console.log(startFlyingEmoji);
};

export default useCreateEmoji;
