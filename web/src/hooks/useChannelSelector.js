import { useContext } from 'react';
import { ChannelContext } from '@/contexts';

const useChannelSelector = (selector) => {
  const state = useContext(ChannelContext);
  return selector(state);
};

export default useChannelSelector;
