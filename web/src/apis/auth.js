import {
  KAKAO_AUTH_API,
  GOOGLE_AUTH_API,
  ANONYMOUS_AUTH_API,
} from '@/constants';
import { get, post } from './http';

/**
 * @param {string} accessToken
 * @returns {{ token: string , user: any }} object
 */
const authByKakao = async (accessToken) => {
  const response = await get({
    url: KAKAO_AUTH_API,
    query: {
      access_token: accessToken,
    },
  });
  const token = response.headers.get('x-auth-token');
  const user = await response.json();

  return { token, user };
};

/**
 * @param {string} accessToken
 * @returns {{ token: string , user: any }} object
 */
const authByGoogle = async (accessToken) => {
  const tokenBlob = new Blob(
    [JSON.stringify({ access_token: accessToken }, null, 2)],
    { type: 'application/json' },
  );
  const response = await post({
    url: GOOGLE_AUTH_API,
    body: tokenBlob,
  });
  const token = response.headers.get('x-auth-token');
  const user = await response.json();

  return { token, user };
};

/**
 * @param {string} accessToken
 * @returns {{ token: string , user: any }} object
 */
const authByNaver = async () => {
  // TODO
};

const authByAnonymous = async () => {
  const response = await get({ url: ANONYMOUS_AUTH_API });
  const token = response.headers.get('x-anonymous-token');
  const user = await response.json();

  return { token, user };
};

export {
  authByGoogle,
  authByKakao,
  authByNaver,
  authByAnonymous,
};
