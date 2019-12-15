import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const SET_CHANNEL_STATUS = gql`
  mutation SetChannelStatus($channelId: String!, $status: String!) {
    setChannelStatus(channelId: $channelId, status: $status) {
      channelStatus
    }
  }
`;

const useSetChannelStatus = () => {
  const [setChannelStatus] = useMutation(SET_CHANNEL_STATUS);

  return setChannelStatus;
};

export default useSetChannelStatus;
