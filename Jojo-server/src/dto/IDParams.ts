import {
  IsEmail,
  IsEnum,
  IsNumberString,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { UserType } from 'src/types';

export class IDParamDto {
  @IsNumberString()
  id: number;
}


