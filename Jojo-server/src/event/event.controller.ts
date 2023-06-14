import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Request,
  Get,
} from '@nestjs/common';
import { EventInputDto } from 'src/dto/post-event.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { EventService } from './event.service';
import { JWTPayload } from 'src/types';

@Controller('event')
export class EventController {
  constructor(
    private jwtService: JwtService,
    private eventService: EventService,
  ) {}
  @Get()
  eventList(@Request() req) {
    let payLoad: JWTPayload = this.jwtService.decode(req);
    return this.eventService.eventList(payLoad);
  }
  @Post()
  newEvent(
    @Body(new ValidationPipe()) eventInput: EventInputDto,
    @Request() req,
  ) {
    let payload = this.jwtService.decode(req);
    return this.eventService.newEvent(payload, eventInput);
  }
}
