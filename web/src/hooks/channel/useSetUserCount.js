import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const SET_USER_COUNT = gql`
  mutation UseSetUserCount($channelId: String! ,$userCount: Int!) {
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
  // const [setCurrentSlide] = useMutation(SET_CURRENT_SLIDE);
  // return { mutate: setUserCount };
  return { mutate: setUserCount, data };
};

export default useSetUserCount;
