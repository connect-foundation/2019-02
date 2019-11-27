import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

const SLIDE_CHANGED = gql`
  subscription SlideChanged($channelId: String!) {
    slideChanged(channelId: $channelId) {
      currentSlide
    }
  }
`;

const useSlideChanged = (channelId) => {
  const { data } = useSubscription(SLIDE_CHANGED, { variables: { channelId } });
  const currentSlide = !data ? 0 : data.slideChanged.currentSlide;

  return { data: currentSlide };
};


export default useSlideChanged;
