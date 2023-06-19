import { Module } from '@nestjs/common';

import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';

import { KnexModule } from 'nest-knexjs';
import { env } from './env';
import { JwtService } from './jwt/jwt.service';
import { PropertyModule } from './property/property.module';
import { EventModule } from './event/event.module';

import { MulterModule } from '@nestjs/platform-express';
import { uploadDir } from './types';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { IndexModule } from './index/index.module';
import { JwtModule } from './jwt/jwt.module';
const config = require('../knexfile');

@Module({
  imports: [
    ChatModule,
    UserModule,
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
    IndexModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
