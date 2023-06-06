import { config } from 'dotenv';
import populateEnv from 'populate-env';
config();
export const env = {
  DB_NAME: 'jojo',
  DB_USERNAME: 'jojo',
  DB_PASSWORD: 'jojo',
  PORT: '5432',
  SERVER_PORT: 8100,
  NODE_ENV: 'development',
};

populateEnv(env, { mode: 'halt' });
