import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const SET_USER_COUNT = gql`
  mutation UseSetUserCount($channelId: String! ,$userCount: [String]) {
    setUserCount(channelId: $channelId, userCount: $userCount) { 
      userCount
    }
  }
`;

const useSetUserCount = () => {
  const [setUserCount, result] = useMutation(SET_USER_COUNT);
  const data = result.data
    ? result.data.userCount
    : null;

  return { mutate: setUserCount, data };
};

export default useSetUserCount;
