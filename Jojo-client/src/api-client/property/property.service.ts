import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, UploadedFiles, UseInterceptors, ValidationPipe, injectNestClient } from 'nest-client';
import { PropertyInputDto } from 'src/dto/post-property.dto';
import {  } from 'nest-client';

import { JWTPayload, uploadDir } from 'src/types';
import { IDParamDto } from 'src/dto/IDParams';
import { FileInterceptor, FilesInterceptor } from 'nest-client';
import { diskStorage } from 'multer';
import { mkdirSync } from 'fs';
import { randomUUID } from 'crypto';
import { filesInterceptorConfig } from 'src/helper';


@Controller('property')
export class PropertyService {
    constructor() {
        injectNestClient(this)
    }

    @Get()
    propertyList(@Request() req: string) {
        throw new Error("stub")
    }

    @Get(':id')
    propertyDetail(@Request() req: string, @Param(new ValidationPipe()) params: IDParamDto) {
        throw new Error("stub")
    }

    @Post()
    @UseInterceptors(filesInterceptorConfig(20))
    newProperty(@UploadedFiles() images: Express.Multer.File[], @Body(new ValidationPipe()) propertyInput: PropertyInputDto, @Request() req: string) {
        throw new Error("stub")
    }

    @Patch(':id')
    @UseInterceptors(filesInterceptorConfig(20))
    propertyEdit(@UploadedFiles() images: Express.Multer.File[], @Request() req: string, @Param(new ValidationPipe()) params: IDParamDto, @Body(new ValidationPipe()) propertyInput: PropertyInputDto) {
        throw new Error("stub")
    }

    @Delete(':id')
    propertyDelete(@Request() req: string, @Param(new ValidationPipe()) params: IDParamDto) {
        throw new Error("stub")
    }
}
