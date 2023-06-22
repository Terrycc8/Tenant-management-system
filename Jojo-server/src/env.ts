import { config } from 'dotenv';
import populateEnv from 'populate-env';
config();
export const env = {
  DB_NAME: '',
  DB_USERNAME: '',
  DB_PASSWORD: '',
  PORT: 5432,
  SERVER_PORT: 8100,
  SERVER_DOMAIN: 'http://localhost:',
  CLIENT_DOMAIN: 'http://localhost:',
  CLIENT_PORT: 5173,
  NODE_ENV: 'development',
  JWT_SECRET: '',
  FACEBOOK_APP_ID: '',
  FACEBOOK_APP_SECRET: '',
};

populateEnv(env, { mode: 'halt' });
