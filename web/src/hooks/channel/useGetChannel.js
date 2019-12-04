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
        listenerList
      }
    }
  } 
`;

const useGetChannel = (channelId) => {
  const { loading, data } = useQuery(CHECK_CHANNEL, { variables: { channelId } });
  const channelData = data ? data.getChannel : null;

  return { data: channelData, loading };
};

export default useGetChannel;
