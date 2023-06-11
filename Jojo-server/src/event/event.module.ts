import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
  controllers: [EventController],
  providers: [EventService, JwtService],
})
export class EventModule {}
