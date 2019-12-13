import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const UPDATE_CHANNEL_OPTIONS = gql`
  mutation updateChannelOptions(
    $channelId: String!, 
    $channelOptions: ChannelOptionsInput,
    ) {
    updateChannelOptions(
      channelId: $channelId, 
      channelOptions: $channelOptions
      ) {
      channelName
      anonymousChat
      emojiEffect
    }
  }
`;

const useUpdateChannelOptions = () => {
  const [updateChannelOptions, result] = useMutation(UPDATE_CHANNEL_OPTIONS);
  const data = result.data ? result.data.updateChannelOption : null;

  return { mutate: updateChannelOptions, data };
};

export default useUpdateChannelOptions;
