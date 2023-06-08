import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, JwtService],
})
export class ChatModule {}
