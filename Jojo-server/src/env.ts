import { config } from 'dotenv';
import populateEnv from 'populate-env';
config();
export const env = {
  POSTGRES_DB: '',
  POSTGRES_USER: '',
  POSTGRES_PASSWORD: '',
  POSTGRES_PORT: 5432,
  POSTGRES_HOST: 'localhost',
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
