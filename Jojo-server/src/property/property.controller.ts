import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { JwtService } from 'src/jwt/jwt.service';
import { PropertyInputDto } from 'src/dto/post-property.dto';
import { Request } from '@nestjs/common';

import { JWTPayload } from 'src/types';
import { IDParamDto } from 'src/dto/IDParams';
import { filesInterceptorConfig } from 'src/helper';
('src/helper');

@Controller('property')
export class PropertyController {
  constructor(
    private propertyService: PropertyService,
    private jwtService: JwtService,
  ) {}
  @Get()
  propertyList(@Request() req) {
    let jwtPayLoad: JWTPayload = this.jwtService.decode(req);
    if (!jwtPayLoad.verified) {
      throw new BadRequestException(
        'Your account is not activated, please check registered email',
      );
    }
    return this.propertyService.propertyList(jwtPayLoad);
  }
  @Get(':id')
  propertyDetail(
    @Request() req,
    @Param(new ValidationPipe()) params: IDParamDto,
  ) {
    let jwtPayLoad: JWTPayload = this.jwtService.decode(req);
    if (!jwtPayLoad.verified) {
      throw new BadRequestException(
        'Your account is not activated, please check registered email',
      );
    }
    return this.propertyService.propertyDetail(jwtPayLoad, params.id);
  }

  @Post()
  @UseInterceptors(filesInterceptorConfig(20))
  newProperty(
    @UploadedFiles()
    images: Express.Multer.File[],
    @Body(new ValidationPipe()) propertyInput: PropertyInputDto,
    @Request()
    req,
  ) {
    let jwtPayLoad: JWTPayload = this.jwtService.decode(req);
    if (!jwtPayLoad.verified) {
      throw new BadRequestException(
        'Your account is not activated, please check registered email',
      );
    }
    return this.propertyService.newProperty(jwtPayLoad, propertyInput, images);
  }
  @Patch(':id')
  @UseInterceptors(filesInterceptorConfig(20))
  propertyEdit(
    //@ts-ignore
    @Request()
    req,
    @Param(new ValidationPipe()) params: IDParamDto,
    @Body(new ValidationPipe()) propertyInput: PropertyInputDto,
  ) {
    let jwtPayLoad: JWTPayload = this.jwtService.decode(req);
    if (!jwtPayLoad.verified) {
      throw new BadRequestException(
        'Your account is not activated, please check registered email',
      );
    }
    return this.propertyService.propertyEdit(
      jwtPayLoad,
      propertyInput,
      params.id,
    );
  }
  @Delete(':id')
  propertyDelete(
    @Request()
    req,
    @Param(new ValidationPipe()) params: IDParamDto,
  ) {
    let jwtPayLoad: JWTPayload = this.jwtService.decode(req);
    if (!jwtPayLoad.verified) {
      throw new BadRequestException(
        'Your account is not activated, please check registered email',
      );
    }
    return this.propertyService.propertyDelete(jwtPayLoad, params.id);
  }
}
