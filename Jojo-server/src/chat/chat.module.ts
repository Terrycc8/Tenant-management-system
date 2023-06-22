import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { JwtService } from 'src/jwt/jwt.service';
import { ChatGateway } from './chat.gateway';

// @Module({
//   controllers: [ChatController],
//   providers: [ChatService, JwtService],
// })
// export class ChatModule {}

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [ChatService, JwtService, ChatGateway],
})
export class ChatModule {}
