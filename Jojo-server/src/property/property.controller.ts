import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { PropertyService } from './property.service';
import { JwtService } from 'src/jwt/jwt.service';
import { PropertyInputDto } from 'src/dto/post-property.dto';
import { Headers } from '@nestjs/common';

import { JWTPayload } from 'src/types';
@Controller('property')
export class PropertyController {
    constructor(
        private propertyService: PropertyService,
        private JwtService: JwtService,
    ) { }
    @Post()
    newProperty(
        @Body(new ValidationPipe()) propertyInput: PropertyInputDto,
        @Headers() headers,
    ) {

        let { id, role }: JWTPayload = this.JwtService.decode(headers);
        console.log(1);
        return this.propertyService.newProperty({ propertyInput, id, role });
    }
}
