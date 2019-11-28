import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

const GET_CHANNELS_BY_CODE = gql`
  query GetChannelsByCode($channelCode: String!) {
    getChannelsByCode(channelCode: $channelCode) {
      status
      channels {
        channelId
        channelName
        channelCode
        channelStatus
        master{
          displayName
        }
      }
    }
  }
`;

const useGetChannelsByCode = () => {
  const [getChannels, { data }] = useLazyQuery(GET_CHANNELS_BY_CODE);
  const result = data
    ? {
      status: data.getChannelsByCode.status,
      channels: data.getChannelsByCode.channels,
    } : { status: null, channels: null };

  return { query: getChannels, data: result };
};

export default useGetChannelsByCode;
