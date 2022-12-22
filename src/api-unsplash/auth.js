import {
  API_URL_AUTH,
  ACCESS_KEY,
  RESPONSE_TYPE,
  REDIRECT_URI,
  SCOPE
} from './const';

export const urlAuth = new URL(API_URL_AUTH);
urlAuth.searchParams.append('client_id', ACCESS_KEY);
urlAuth.searchParams.append('response_type', RESPONSE_TYPE);
urlAuth.searchParams.append('redirect_uri', REDIRECT_URI);
urlAuth.searchParams.append('scope', SCOPE);
