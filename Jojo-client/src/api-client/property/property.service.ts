import { Body, Controller, Get, Param, Post, ValidationPipe, injectNestClient } from 'nest-client';
import { PropertyInputDto } from 'src/dto/post-property.dto';
import { Headers } from 'nest-client';

import { JWTPayload } from 'src/types';
import { IDParamDto } from 'src/dto/IDParams';

@Controller('property')
export class PropertyService {
    constructor() {
        injectNestClient(this)
    }

    @Get()
    propertyList(@Headers() headers: string) {
        throw new Error("stub")
    }

    @Get(':id')
    propertyDetail(@Headers() headers: string, @Param(new ValidationPipe()) params: IDParamDto) {
        throw new Error("stub")
    }

    @Post()
    newProperty(@Body(new ValidationPipe()) propertyInput: PropertyInputDto, @Headers() headers: string) {
        throw new Error("stub")
    }
}
