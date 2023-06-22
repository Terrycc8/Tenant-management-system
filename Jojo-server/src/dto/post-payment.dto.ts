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
import { isNull } from 'util';

export class PaymentInputDto {
  @IsString()
  @Length(1, 16)
  title: string;
  @IsNumberString()
  rent: number;
  @IsDateString()
  billing_period_from: Date;
  @IsDateString()
  billing_period_to: Date;
  @IsOptional()
  @IsString()
  payer_id: string;
}
