import {
  KAKAO_AUTH_API,
  GOOGLE_AUTH_API,
} from '@/constants';

/**
 * @param {string} accessToken
 * @returns {{ token: string , user: any }} object
 */
const authByKakao = async (accessToken) => {
  const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  };
  const response = await fetch(
    `${KAKAO_AUTH_API}${accessToken}`,
    options,
  );
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
  const options = {
    method: 'POST',
    body: tokenBlob,
    mode: 'cors',
    cache: 'default',
  };
  const response = await fetch(GOOGLE_AUTH_API, options);
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

export {
  authByGoogle,
  authByKakao,
  authByNaver,
};
