import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const SET_CURRENT_SLIDE = gql`
  mutation SetCurrentSlide($channelId: String!, $currentSlide: Int!) {
    setCurrentSlide(channelId: $channelId, currentSlide: $currentSlide) { 
     currentSlide
    }
  }
`;

const useSetCurrentSlide = () => {
  const [setCurrentSlide] = useMutation(SET_CURRENT_SLIDE);
  return { mutate: setCurrentSlide };
};

export default useSetCurrentSlide;
