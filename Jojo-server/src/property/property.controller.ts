import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
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

import { JWTPayload, uploadDir } from 'src/types';
import { IDParamDto } from 'src/dto/IDParams';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { mkdirSync } from 'fs';
import { randomUUID } from 'crypto';
import { filesInterceptorConfig } from 'src/helper';

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
  @UseInterceptors(filesInterceptorConfig(20))
  newProperty(
    @UploadedFiles()
    images: Express.Multer.File[],
    @Body(new ValidationPipe()) propertyInput: PropertyInputDto,
    @Request()
    req,
  ) {
    let payLoad: JWTPayload = this.jwtService.decode(req);

    return this.propertyService.newProperty(payLoad, propertyInput, images);
  }
  @Patch(':id')
  @UseInterceptors(filesInterceptorConfig(20))
  propertyEdit(
    @UploadedFiles() images: Express.Multer.File[],
    @Request()
    req,
    @Param(new ValidationPipe()) params: IDParamDto,
    @Body(new ValidationPipe()) propertyInput: PropertyInputDto,
  ) {
    let payLoad: JWTPayload = this.jwtService.decode(req);

    return this.propertyService.propertyEdit(payLoad, propertyInput, params.id);
  }
  @Delete(':id')
  propertyDelete(
    @Request()
    req,
    @Param(new ValidationPipe()) params: IDParamDto,
  ) {
    let payLoad: JWTPayload = this.jwtService.decode(req);

    return this.propertyService.propertyDelete(payLoad, params.id);
  }
}
