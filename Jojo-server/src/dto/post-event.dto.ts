import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsString,
  IsStrongPassword,
  Length,
  minLength,
} from 'class-validator';
import { UserType } from 'src/types';

export class EventInputDto {
  @IsString()
  @Length(1, 32)
  title: string;
  @IsString()
  type: 'maintenance' | 'notices' | 'reimbursement' | 'complaint';
  @IsString()
  priority: 'high' | 'medium' | 'low';
  @IsString()
  @Length(0, 256)
  description: string;
  @IsNumberString()
  property_id: number;
}
