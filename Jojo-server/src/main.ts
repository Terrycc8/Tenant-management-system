import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { print } from 'listening-on';
import { env } from './env';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as socketIO from 'socket.io';
import * as http from 'http';
import * as cors from 'cors';
import * as express from 'express';
import { ChatController } from './chat/chat.controller';

async function bootstrap() {
  const expressApp = express();

  expressApp.use(cors());
  expressApp.use(express.static('upload'));

  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  await nestApp.init();

  const server = http.createServer(expressApp);

  const io = new socketIO.Server(server, {
    cors: { origin: '*' },
  });
  ChatController.io = io;

  server.listen(env.SERVER_PORT, () => {
    print(env.SERVER_PORT);
  });
}
bootstrap();
