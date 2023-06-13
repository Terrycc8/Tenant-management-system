import { Module } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { JwtService } from 'src/jwt/jwt.service';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [PropertyController],
  providers: [PropertyService, JwtService, UploadService],
})
export class PropertyModule {}
