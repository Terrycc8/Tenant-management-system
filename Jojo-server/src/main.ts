import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { print } from 'listening-on';
import { env } from './env';
import { NestExpressApplication } from '@nestjs/platform-express';
import { uploadDir } from './types';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('upload');
  app.enableCors();

  await app.listen(env.SERVER_PORT, () => {
    print(env.SERVER_PORT);
  });
}
bootstrap();
