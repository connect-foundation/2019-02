import getToken from '@/graphql/cache/getToken';

const defaultOptions = {
  method: 'GET',
  mode: 'cors',
};

export const get = ({
  url = '',
  query = {},
}) => {
  const token = getToken();
  const queryString = Object.keys(query).reduce((str, key) => `${str}&${key}=${query[key]}`, '');
  const requestUrl = queryString ? `${url}?${queryString}` : url;

  return fetch(requestUrl, {
    ...defaultOptions,
    headers: {
      'x-auth-token': token,
    },
  });
};

export const post = ({
  url = '',
  headers = {},
  body = {},
}) => {
  const token = getToken();

  return fetch(url, {
    ...defaultOptions,
    method: 'POST',
    headers: {
      ...headers,
      'x-auth-token': token,
    },
    body,
  });
};

export const polling = ({ url, callback }) => {
  let done = false;
  const request = () => get({ url })
    .then((response) => response.json())
    .then((payload) => {
      callback(payload);

      if (!done) {
        return request();
      }

      return null;
    });

  request();

  return () => {
    done = true;
  };
};
