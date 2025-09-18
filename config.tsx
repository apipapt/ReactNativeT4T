const env = 'production';
// (process.env.NODE_ENV as 'production' | 'development') || 'development'

const apiUrl = {
  development: 'https://api.t4t-api.org/api/',
  production: 'https://api.t4t-api.org/api/',
};

export const API_URL = apiUrl[env];
