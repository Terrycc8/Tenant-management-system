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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
