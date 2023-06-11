import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Headers,
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
  propertyList(@Headers() headers) {
    let payLoad: JWTPayload = this.jwtService.decode(headers);
    return this.eventService.eventList(payLoad);
  }
  @Post()
  newEvent(
    @Body(new ValidationPipe()) eventInput: EventInputDto,
    @Headers() headers,
  ) {
    let payload = this.jwtService.decode(headers);
    return this.eventService.newEvent(payload, eventInput);
  }
}
