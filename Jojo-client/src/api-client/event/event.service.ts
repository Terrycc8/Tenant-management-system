import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Get,
  injectNestClient,
} from "nest-client";
import { EventInputDto } from "src/dto/post-event.dto";
import { JWTPayload } from "src/types";

@Controller("event")
export class EventService {
  constructor() {
    injectNestClient(this);
  }

  @Get()
  eventList(@Request() req: string) {
    throw new Error("stub");
  }

  @Post()
  newEvent(
    @Body(new ValidationPipe()) eventInput: EventInputDto,
    @Request() req: string
  ) {
    throw new Error("stub");
  }
}
