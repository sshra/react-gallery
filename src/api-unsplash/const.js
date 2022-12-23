export const API_URL = 'https://api.unsplash.com';
export const API_URL_AUTH = 'https://unsplash.com/oauth/authorize';
export const API_URL_TOKEN = 'https://unsplash.com/oauth/token';
export const ACCESS_KEY = 'FESONE4F-mW8F8F_VSW78QG7A9W4oLSWlm8JWphEw9s';
export const SECRET_KEY = 'wIhdLMqVM4DHWVWxN6Bx7P-Oo7Hd7yiGNVzChtzrKrw';
export const REDIRECT_URI = location.protocol + '//' +
  location.hostname + (location.port ? `:${location.port}` : '') + '/auth';
console.log(REDIRECT_URI);
export const RESPONSE_TYPE = 'code';
export const SCOPE = 'public read_user read_photos write_likes';
export const GRANT_TYPE = 'authorization_code';
