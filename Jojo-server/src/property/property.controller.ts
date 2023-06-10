import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { JwtService } from 'src/jwt/jwt.service';
import { PropertyInputDto } from 'src/dto/post-property.dto';
import { Headers } from '@nestjs/common';

import { JWTPayload } from 'src/types';
import { IDParamDto } from 'src/dto/IDParams';
@Controller('property')
export class PropertyController {
  constructor(
    private propertyService: PropertyService,
    private jwtService: JwtService,
  ) {}
  @Get()
  propertyList(@Headers() headers) {
    let payLoad: JWTPayload = this.jwtService.decode(headers);
    return this.propertyService.propertyList(payLoad);
  }
  @Get(':id')
  propertyDetail(
    @Headers() headers,
    @Param(new ValidationPipe()) params: IDParamDto,
  ) {
    let payLoad: JWTPayload = this.jwtService.decode(headers);

    return this.propertyService.propertyDetail(payLoad, params.id);
  }
  @Post()
  newProperty(
    @Body(new ValidationPipe()) propertyInput: PropertyInputDto,
    @Headers() headers,
  ) {
    let payLoad: JWTPayload = this.jwtService.decode(headers);

    return this.propertyService.newProperty(payLoad, propertyInput);
  }
}
