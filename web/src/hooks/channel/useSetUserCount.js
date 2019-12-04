import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const SET_USER_COUNT = gql`
  mutation useSetUserCount($channelId: String! ,$userCount: Number!) {
    addUser(channelId: $channelId, userCount: $userCount) { 
      countUser
    }
  }
`;

const useSetUserCount = () => {
  const [setUserCount, result] = useMutation(SET_USER_COUNT);
  const data = result.data
    ? result.data.addUser
    : null;

  return { mutate: setUserCount, data };
};

export default useSetUserCount;
