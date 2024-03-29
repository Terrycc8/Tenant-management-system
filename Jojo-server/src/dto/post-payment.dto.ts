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

import { isNull } from 'util';

export class PaymentInputDto_id {
  @IsString()
  @Length(1, 16)
  title: number;
  @IsNumberString()
  rent: number;
  @IsDateString()
  billing_period_from: Date;
  @IsDateString()
  billing_period_to: Date;
  // @IsOptional()
  // @IsString()
  // payer_id: string;
}

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
  // @IsOptional()
  // @IsString()
  // payer_id: string;
}
