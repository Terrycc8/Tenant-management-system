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
  Query,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
  BadRequestException,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtService } from 'src/jwt/jwt.service';
import { PaymentInputDto_id } from 'src/dto/post-payment.dto';
import { Request } from '@nestjs/common';

import { JWTPayload, uploadDir } from 'src/types';
import { IDParamDto } from 'src/dto/IDParams';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { mkdirSync } from 'fs';
import { randomUUID } from 'crypto';
import { filesInterceptorConfig } from 'src/helper';

@Controller('payment')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private jwtService: JwtService,
  ) {}
  @Get()
  paymentList(
    @Request() req,
    // @Query('offset', new DefaultValuePipe(10), ParseIntPipe) offset: number,
    // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    let jwtPayLoad: JWTPayload = this.jwtService.decode(req);
    if (!jwtPayLoad.verified) {
      throw new BadRequestException(
        'Your account is not activated, please check registered email',
      );
    }
    return this.paymentService.paymentList(jwtPayLoad);
  }
  // @Get(':id')
  // paymentDetail(
  //   @Request() req,
  //   @Param(new ValidationPipe()) params: IDParamDto,
  // ) {
  //   let payLoad: JWTPayload = this.jwtService.decode(req);
  //   return this.paymentService.paymentDetail(payLoad, params.id);
  // }
  @Post()
  @UseInterceptors(filesInterceptorConfig(20))
  newPayment(
    @UploadedFiles()
    images: Express.Multer.File[],
    @Body(new ValidationPipe()) paymentInput: PaymentInputDto_id,
    @Request()
    req,
  ) {
    let payLoad: JWTPayload = this.jwtService.decode(req);
    return this.paymentService.newPayment(payLoad, paymentInput, images);
  }
  // @Patch(':id')
  // @UseInterceptors(filesInterceptorConfig(20))
  // paymentEdit(
  //   //@ts-ignore
  //   @Request()
  //   req,
  //   @Param(new ValidationPipe()) params: IDParamDto,
  //   @Body(new ValidationPipe()) paymentInput: PaymentInputDto,
  // ) {
  //   let payLoad: JWTPayload = this.jwtService.decode(req);
  //   return this.paymentService.paymentEdit(payLoad, paymentInput, params.id);
  // }
  // @Delete(':id')
  // paymentDelete(
  //   @Request()
  //   req,
  //   @Param(new ValidationPipe()) params: IDParamDto,
  // ) {
  //   let payLoad: JWTPayload = this.jwtService.decode(req);
  //   return this.paymentService.paymentDelete(payLoad, params.id);
  // }
}
