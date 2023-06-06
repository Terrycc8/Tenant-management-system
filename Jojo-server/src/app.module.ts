import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { ComplaintModule } from './complaint/complaint.module';
import { KnexModule } from 'nest-knexjs';
import { env } from './env';
const config = require('./knexfile');

@Module({
  imports: [
    ChatModule,
    UserModule,
    ComplaintModule,
    ChatModule,
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: config[env.NODE_ENV],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
