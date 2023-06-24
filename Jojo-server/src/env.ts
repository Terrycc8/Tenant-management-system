import { config } from 'dotenv';
import populateEnv from 'populate-env';
config();
export const env = {
  POSTGRES_DB: '',
  POSTGRES_USER: '',
  POSTGRES_PASSWORD: '',
  POSTGRES_PORT: 5432,
  POSTGRES_HOST: 'localhost',
  SERVER_PORT: 8300,
  SERVER_DOMAIN: 'http://localhost:8300',
  CLIENT_DOMAIN: 'http://localhost:5173',
  NODE_ENV: '',
  JWT_SECRET: '',
  FACEBOOK_APP_ID: '',
  FACEBOOK_APP_SECRET: '',
};

if (process.env.NODE_ENV == 'production') {
  env.SERVER_DOMAIN = 'https://jojo.terry-chan.com';
  env.CLIENT_DOMAIN = 'https://app.terry-chan.com';
}

populateEnv(env, { mode: 'halt' });
