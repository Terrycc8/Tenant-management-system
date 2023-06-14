import { Body, Controller, Post, ValidationPipe, Headers, Get, injectNestClient } from 'nest-client';
import { EventInputDto } from 'src/dto/post-event.dto';
import { JWTPayload } from 'src/types';


@Controller('event')
export class EventService {
    constructor() {
        injectNestClient(this)
    }

    @Get()
    propertyList(@Headers() headers: string) {
        throw new Error("stub")
    }

    @Post()
    newEvent(@Body(new ValidationPipe()) eventInput: EventInputDto, @Headers() headers: string) {
        throw new Error("stub")
    }
}
