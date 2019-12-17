import { InMemoryCache } from 'apollo-cache-inmemory';
import { CHAT_SORT_BY_RECENT } from '@/constants';

const cache = new InMemoryCache();

const token = localStorage.getItem('DROPY_TOKEN');
const tokenAnonymous = localStorage.getItem('DROPY_ANONYMOUS_TOKEN');
const userId = localStorage.getItem('DROPY_USER_ID');
const displayName = localStorage.getItem('DROPY_USERNAME');

const defaultCacheData = {
  authentication: {
    __typename: 'authentication',
    isLoggedIn: !!token,
    isAnonymous: !token && (!!tokenAnonymous || true),
    userId,
    displayName,
    token: token || tokenAnonymous,
  },
  chatLogs: {
    __typename: 'chatLogs',
    logs: [],
    changeAction: null,
    sortType: CHAT_SORT_BY_RECENT,
  },
};

cache.writeData({
  data: defaultCacheData,
});

export default cache;
