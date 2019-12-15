const { API_HOST } = process.env;
const { WS_HOST } = process.env;
const { CONVERTER_HOST } = process.env;

export const CONVERT_API = `${CONVERTER_HOST}/images`;
export const CONVERT_PROGRESS_API = `${CONVERTER_HOST}/progress`;
export const GRAPHQL_API = `${API_HOST}/graphql`;
export const GRAPHQL_WS_API = `${WS_HOST}/graphql`;
export const KAKAO_AUTH_API = `${API_HOST}/auth/kakao`;
export const GOOGLE_AUTH_API = `${API_HOST}/auth/google`;
export const NAVER_AUTH_API = `${API_HOST}/auth/naver`;
export const NAVER_AUTH_CALLBACK = 'http://localhost:8000/login/callback';
export const ANONYMOUS_AUTH_API = `${API_HOST}/auth/anonymous`;
export const NAVER_ID_SDK_URL = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js';
