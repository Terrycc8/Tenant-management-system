import { config } from 'dotenv';
import populateEnv from 'populate-env';
config();
export const env = {
  DB_NAME: '',
  DB_USERNAME: '',
  DB_PASSWORD: '',
  PORT: '5432',
  SERVER_PORT: 8100,
  NODE_ENV: 'development',
  JWT_SECRET: '',
};

populateEnv(env, { mode: 'halt' });
