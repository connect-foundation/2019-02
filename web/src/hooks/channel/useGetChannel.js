import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const CHECK_CHANNEL = gql`
  query GetChannel($channelId: String!) {
    getChannel(channelId: $channelId) {
      status
      isMaster
      channel{
        slideUrls
        slideRatioList
        fileUrl
        master{
          displayName
        }
        currentSlide
        channelCode
        channelOptions{
          channelName
          anonymousChat
        }
      }
    }
  } 
`;

const useGetChannel = (channelId) => {
  const { loading, data } = useQuery(CHECK_CHANNEL, { variables: { channelId } });
  const channelData = loading ? null : data.getChannel;

  return { data: channelData, loading };
};

export default useGetChannel;
