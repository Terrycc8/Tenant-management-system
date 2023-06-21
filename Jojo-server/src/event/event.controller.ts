import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Request,
  Get,
  UseInterceptors,
  UploadedFiles,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Patch,
  Param,
} from '@nestjs/common';
import { EventInputDto } from 'src/dto/post-event.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { EventService } from './event.service';
import { JWTPayload, PatchEventInput } from 'src/types';
import { filesInterceptorConfig } from 'src/helper';
import { IDParamDto } from 'src/dto/IDParams';

@Controller('event')
export class EventController {
  constructor(
    private jwtService: JwtService,
    private eventService: EventService,
  ) {}
  @Get()
  eventList(
    @Request() req,
    @Query('offset', new DefaultValuePipe(10), ParseIntPipe) offset: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    let payLoad: JWTPayload = this.jwtService.decode(req);

    return this.eventService.eventList(payLoad, offset, page);
  }
  @Post()
  @UseInterceptors(filesInterceptorConfig(5))
  newEvent(
    @UploadedFiles()
    images: Express.Multer.File[],
    @Body(new ValidationPipe()) eventInput: EventInputDto,
    @Request() req,
  ) {
    let payload = this.jwtService.decode(req);
    return this.eventService.newEvent(payload, eventInput, images);
  }
  @Patch(':id')
  patchEvent(
    @Body(new ValidationPipe()) patchEventInput: PatchEventInput,
    @Request() req,
    @Param(new ValidationPipe()) params: IDParamDto,
  ) {
    let payload = this.jwtService.decode(req);
    console.log(patchEventInput);
    return this.eventService.patchEvent(patchEventInput, payload, params.id);
  }
}
