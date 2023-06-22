import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  isNumberString,
  minLength,
} from 'class-validator';
import {
  PropertyArea,
  PropertyDistrict,
  UserType,
  propertyAreaEnumMsg,
  propertyDistrictEnumMsg,
} from 'src/types';

export class PropertyInputDto {
  @IsString()
  @Length(1, 16)
  title: string;
  @IsNumberString()
  rent: number;
  @IsEnum(PropertyArea, propertyAreaEnumMsg)
  area: string;
  @IsEnum(PropertyDistrict, propertyDistrictEnumMsg)
  district: string;
  @IsString()
  @Length(1, 32)
  location: string;
  @IsString()
  @Length(1, 32)
  street: string;
  @Length(1, 32)
  @IsString()
  building: string;
  @IsString()
  @Length(1, 4)
  block: string;
  @IsString()
  @Length(1, 4)
  floor: string;
  @IsString()
  @Length(1, 4)
  room: string;
  @IsDateString()
  rental_start_at: Date;
  @IsDateString()
  rental_end_at: Date;
}
