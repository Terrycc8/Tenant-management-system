import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { print } from 'listening-on';
import { env } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(env.SERVER_PORT, () => {
    print(env.SERVER_PORT);
  });
}
bootstrap();
