import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const CHECK_CHANNEL = gql`
  query GetChannel($channelId: String!) {
    getChannel(channelId: $channelId) {
      status
      isMaster
      channel{
        slideUrls
        fileUrl
        master{
          displayName
        }
        channelName
        currentSlide
        channelCode
      }
    }
  } 
`;

const useGetChannel = (channelId) => {
  const result = useQuery(CHECK_CHANNEL, { variables: { channelId } });
  const data = result.data ? result.data.getChannel : null;

  return { data };
};

export default useGetChannel;
