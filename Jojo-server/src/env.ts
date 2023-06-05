import populateEnv from 'populate-env';

const env = {
  DB_NAME: '',
  DB_USERNAME: '',
  DB_PASSWORD: '',
  PORT: '5432',
  ENV_NODE: 'development',
};

populateEnv(env, { mode: 'halt' });
