import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';

const SLIDE_CHANGED = gql`
  subscription slideChanged($channelId: String!) {
    slideChanged(channelId: $channelId) {
      currentSlide
    }
  }
`;

const useSlideChanged = (channelId) => {
  const {
    data: { slideChanged },
    loading,
    error,
  } = useSubscription(SLIDE_CHANGED, { variables: { channelId } });
  if (error) { console.log(error); }
  return { data: slideChanged, loading };
};


export default useSlideChanged;
