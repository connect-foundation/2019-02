import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import { useChannelSelector } from '@/hooks';

const SLIDE_CHANGED = gql`
  subscription SlideChanged($channelId: String!) {
    slideChanged(channelId: $channelId) {
      currentSlide
    }
  }
`;

const useSlideChanged = (channelId) => {
  const initialSlide = useChannelSelector((state) => state.initialSlide);
  const { data } = useSubscription(SLIDE_CHANGED, { variables: { channelId } });
  const currentSlide = !data ? initialSlide : data.slideChanged.currentSlide;

  return { currentSlide };
};


export default useSlideChanged;
