import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { ComplaintModule } from './complaint/complaint.module';
import { KnexModule } from 'nest-knexjs';
import { env } from './env';
import { JwtService } from './jwt/jwt.service';
import { PropertyModule } from './property/property.module';
import { EventModule } from './event/event.module';

import { MulterModule } from '@nestjs/platform-express';
import { uploadDir } from './types';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
const config = require('../knexfile');

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
    PropertyModule,
    EventModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
