import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const CREATE_CHANNEL = gql`
  mutation createChannel(
    $channelId: String!, 
    $channelCode: String!,
    $slideUrls: [String], 
    $fileUrl: String,
  ) {
    createChannel(
      channelId: $channelId,
      channelCode: $channelCode,
      slideUrls: $slideUrls,
      fileUrl: $fileUrl
    ) { 
      status 
      channel { 
        channelId
      }
    }
  }
`;

const useCreateChannel = () => {
  const [createChannel, result] = useMutation(CREATE_CHANNEL);
  const data = result.data
    ? result.data.createChannel
    : { status: null, channel: { channelId: null } };

  return { mutate: createChannel, data };
};

export default useCreateChannel;
