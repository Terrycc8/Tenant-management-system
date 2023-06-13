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
import { Request } from '@nestjs/common';

import { JWTPayload } from 'src/types';
import { IDParamDto } from 'src/dto/IDParams';
@Controller('property')
export class PropertyController {
  constructor(
    private propertyService: PropertyService,
    private jwtService: JwtService,
  ) {}
  @Get()
  propertyList(@Request() req) {
    let payLoad: JWTPayload = this.jwtService.decode(req);
    return this.propertyService.propertyList(payLoad);
  }
  @Get(':id')
  propertyDetail(
    @Request() req,
    @Param(new ValidationPipe()) params: IDParamDto,
  ) {
    let payLoad: JWTPayload = this.jwtService.decode(req);

    return this.propertyService.propertyDetail(payLoad, params.id);
  }
  @Post()
  newProperty(
    @Body(new ValidationPipe()) propertyInput: PropertyInputDto,
    @Request() req,
  ) {
    let payLoad: JWTPayload = this.jwtService.decode(req);

    return this.propertyService.newProperty(payLoad, propertyInput);
  }
}
