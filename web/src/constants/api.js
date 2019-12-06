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
export const NAVER_AUTH_CALLBACK = `${API_HOST}/auth/naver/callback`;
export const ANONYMOUS_AUTH_API = `${API_HOST}/auth/anonymous`;
