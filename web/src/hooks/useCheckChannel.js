import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const CHECK_CHANNEL = gql`
  query CheckChannel($channelId: String!) {
    checkChannel(channelId: $channelId) {
      status
      isMaster
      slideUrls
      fileUrl
    }
  } 
`;
const useCheckChannel = (channelId) => {
  console.log('checkchannel');
  const result = useQuery(CHECK_CHANNEL, { variables: { channelId } });
  const data = result.data ? result.data.checkChannel : null;
  return { data };
};

export default useCheckChannel;
