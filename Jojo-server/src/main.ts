import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { print } from 'listening-on';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8100, () => {
    print(8100);
  });
}
bootstrap();
