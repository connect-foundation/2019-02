import {
  CHAT_INIT,
  CHAT_ADDED,
  MY_CHAT_ADDED,
  CHAT_UPDATED,
} from '@/constants';

export const chatInit = () => `${CHAT_INIT}__`;

export const chatAdded = (id) => `${CHAT_ADDED}__${id}`;

export const myChatAdded = (id) => `${MY_CHAT_ADDED}__${id}`;

export const chatUpdated = (id) => `${CHAT_UPDATED}__${id}`;

export const getType = (changeAction) => (changeAction
  ? changeAction.substring(0, changeAction.indexOf('__'))
  : null);
