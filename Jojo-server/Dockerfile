From node:18.16.1-slim
WORKDIR /srv/jojo-app
COPY package.json .
RUN apt-get update && apt-get install -y git
RUN npm i --omit=dev
COPY ./dist .
COPY .env .
EXPOSE 8300
CMD npx knex migrate:latest && node src/main.js 
