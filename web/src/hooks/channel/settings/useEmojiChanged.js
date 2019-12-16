import gql from 'graphql-tag';
import { useSubscription } from '@apollo/react-hooks';
import { useChannelSelector } from '@/hooks';

const EMOJI_CHANGED = gql`
  subscription OptionChanged($channelId: String!) {
    optionChanged(channelId: $channelId) {
      emojiEffect
    }
  }
`;

const useEmojiChanged = (channelId) => {
  const prevEmojiEffect = useChannelSelector((state) => state.emojiEffect);
  const { data } = useSubscription(EMOJI_CHANGED, { variables: { channelId } });
  const emojiEffect = !data ? prevEmojiEffect : data.optionChanged.emojiEffect;

  return { emojiEffect };
};


export default useEmojiChanged;
